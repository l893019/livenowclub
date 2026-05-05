import { encrypt, decrypt, isEncrypted } from './crypto'

// Mock Redis before importing utopia module
const mockRedisInstance = {
  get: jest.fn(),
  set: jest.fn(),
  keys: jest.fn().mockResolvedValue([]),
  exists: jest.fn(),
}

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => mockRedisInstance)
})

// Mock crypto module
jest.mock('./crypto', () => ({
  encrypt: jest.fn(),
  decrypt: jest.fn(),
  isEncrypted: jest.fn(),
}))

import {
  saveUserResult,
  getUserResult,
  updateUserEmail,
  updateUserArchetype,
  UserResult,
  generateUserId,
} from './utopia'

const mockEncrypt = encrypt as jest.MockedFunction<typeof encrypt>
const mockDecrypt = decrypt as jest.MockedFunction<typeof decrypt>
const mockIsEncrypted = isEncrypted as jest.MockedFunction<typeof isEncrypted>

describe('User Data Encryption', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Default crypto mock implementations
    mockEncrypt.mockImplementation(async (text: string) => `encrypted_${text}`)
    mockDecrypt.mockImplementation(async (text: string) => text.replace('encrypted_', ''))
    mockIsEncrypted.mockImplementation((text: string) => text.startsWith('encrypted_'))
  })

  describe('saveUserResult', () => {
    it('should encrypt email and answers before storing', async () => {
      const userResult: UserResult = {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: ['answer1', 'answer2', 'answer3'],
        createdAt: '2024-01-01T00:00:00Z',
      }

      await saveUserResult(userResult)

      // Verify encryption was called
      expect(mockEncrypt).toHaveBeenCalledWith('test@example.com')
      expect(mockEncrypt).toHaveBeenCalledWith(JSON.stringify(['answer1', 'answer2', 'answer3']))

      // Verify Redis.set was called with encrypted data
      expect(mockRedisInstance.set).toHaveBeenCalledWith(
        'user:user-123',
        expect.stringContaining('encrypted_'),
        'EX',
        7776000
      )

      // Parse the stored data to verify structure
      const storedData = JSON.parse((mockRedisInstance.set as jest.Mock).mock.calls[0][1])
      expect(storedData.email).toBe('encrypted_test@example.com')
      expect(storedData.answers).toBe('encrypted_["answer1","answer2","answer3"]')
      expect(storedData.name).toBe('Test User') // Not encrypted
      expect(storedData.archetype).toBe('builder') // Not encrypted
    })

    it('should handle null email correctly', async () => {
      const userResult: UserResult = {
        id: 'user-456',
        name: 'Anonymous',
        email: null,
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: ['answer1'],
        createdAt: '2024-01-01T00:00:00Z',
      }

      await saveUserResult(userResult)

      // Email encryption should not be called for null
      expect(mockEncrypt).not.toHaveBeenCalledWith(null)
      expect(mockEncrypt).toHaveBeenCalledWith(JSON.stringify(['answer1']))

      // Verify stored data has null email
      const storedData = JSON.parse((mockRedisInstance.set as jest.Mock).mock.calls[0][1])
      expect(storedData.email).toBeNull()
    })

    it('should handle empty answers array', async () => {
      const userResult: UserResult = {
        id: 'user-789',
        name: 'Test User',
        email: 'test@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: [],
        createdAt: '2024-01-01T00:00:00Z',
      }

      await saveUserResult(userResult)

      expect(mockEncrypt).toHaveBeenCalledWith(JSON.stringify([]))
    })
  })

  describe('getUserResult', () => {
    it('should decrypt email and answers when retrieving encrypted data', async () => {
      const encryptedData = {
        id: 'user-123',
        name: 'Test User',
        email: 'encrypted_test@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: 'encrypted_["answer1","answer2","answer3"]',
        createdAt: '2024-01-01T00:00:00Z',
      }

      mockRedisInstance.get.mockResolvedValue(JSON.stringify(encryptedData))

      const result = await getUserResult('user-123')

      expect(mockIsEncrypted).toHaveBeenCalledWith('encrypted_test@example.com')
      expect(mockIsEncrypted).toHaveBeenCalledWith('encrypted_["answer1","answer2","answer3"]')
      expect(mockDecrypt).toHaveBeenCalledWith('encrypted_test@example.com')
      expect(mockDecrypt).toHaveBeenCalledWith('encrypted_["answer1","answer2","answer3"]')

      expect(result).toEqual({
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: ['answer1', 'answer2', 'answer3'],
        createdAt: '2024-01-01T00:00:00Z',
      })
    })

    it('should handle lazy migration of unencrypted data', async () => {
      // Old unencrypted data
      const unencryptedData = {
        id: 'user-old',
        name: 'Old User',
        email: 'old@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: ['answer1', 'answer2'],
        createdAt: '2024-01-01T00:00:00Z',
      }

      mockRedisInstance.get.mockResolvedValue(JSON.stringify(unencryptedData))
      mockIsEncrypted.mockImplementation((text: string) => {
        // Plaintext should return false
        if (text === 'old@example.com' || text === '["answer1","answer2"]') {
          return false
        }
        return text.startsWith('encrypted_')
      })

      const result = await getUserResult('user-old')

      // Should detect unencrypted data
      expect(mockIsEncrypted).toHaveBeenCalledWith('old@example.com')

      // Should re-save with encryption (lazy migration)
      expect(mockEncrypt).toHaveBeenCalledWith('old@example.com')
      expect(mockEncrypt).toHaveBeenCalledWith(JSON.stringify(['answer1', 'answer2']))
      expect(mockRedisInstance.set).toHaveBeenCalled()

      // Should return decrypted data
      expect(result?.email).toBe('old@example.com')
      expect(result?.answers).toEqual(['answer1', 'answer2'])
    })

    it('should handle null email during decryption', async () => {
      const data = {
        id: 'user-null',
        name: 'User',
        email: null,
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: 'encrypted_["answer1"]',
        createdAt: '2024-01-01T00:00:00Z',
      }

      mockRedisInstance.get.mockResolvedValue(JSON.stringify(data))

      const result = await getUserResult('user-null')

      // Should not try to decrypt null
      expect(mockDecrypt).not.toHaveBeenCalledWith(null)
      expect(result?.email).toBeNull()
    })

    it('should handle missing user data', async () => {
      mockRedisInstance.get.mockResolvedValue(null)
      mockRedisInstance.keys.mockResolvedValue([])

      const result = await getUserResult('non-existent')

      expect(result).toBeNull()
    })

    it('should handle decryption errors gracefully', async () => {
      const encryptedData = {
        id: 'user-error',
        name: 'User',
        email: 'encrypted_corrupted',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: 'encrypted_["answer1"]',
        createdAt: '2024-01-01T00:00:00Z',
      }

      mockRedisInstance.get.mockResolvedValue(JSON.stringify(encryptedData))
      mockDecrypt.mockRejectedValue(new Error('Decryption failed'))

      await expect(getUserResult('user-error')).rejects.toThrow('Decryption failed')
    })
  })

  describe('updateUserEmail', () => {
    it('should encrypt new email when updating', async () => {
      const existingData = {
        id: 'user-123',
        name: 'Test User',
        email: 'encrypted_old@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: 'encrypted_["answer1"]',
        createdAt: '2024-01-01T00:00:00Z',
      }

      mockRedisInstance.get.mockResolvedValue(JSON.stringify(existingData))

      await updateUserEmail('user-123', 'new@example.com')

      // Should encrypt the new email
      expect(mockEncrypt).toHaveBeenCalledWith('new@example.com')

      // Should save with encrypted email
      expect(mockRedisInstance.set).toHaveBeenCalled()
      const savedData = JSON.parse((mockRedisInstance.set as jest.Mock).mock.calls[0][1])
      expect(savedData.email).toBe('encrypted_new@example.com')
    })

    it('should handle updating to null email', async () => {
      const existingData = {
        id: 'user-123',
        name: 'Test User',
        email: 'encrypted_old@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: 'encrypted_["answer1"]',
        createdAt: '2024-01-01T00:00:00Z',
      }

      mockRedisInstance.get.mockResolvedValue(JSON.stringify(existingData))

      await updateUserEmail('user-123', null as any)

      expect(mockEncrypt).not.toHaveBeenCalledWith(null)
    })
  })

  describe('updateUserArchetype', () => {
    it('should encrypt new answers when updating archetype', async () => {
      const existingData = {
        id: 'user-123',
        name: 'Test User',
        email: 'encrypted_test@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: 'encrypted_["old1","old2"]',
        createdAt: '2024-01-01T00:00:00Z',
      }

      mockRedisInstance.get.mockImplementation(async (key: string) => {
        if (key === 'user:user-123') return JSON.stringify(existingData)
        if (key === 'user:user-123:utopias') return JSON.stringify([])
        return null
      })
      mockRedisInstance.keys.mockResolvedValue([]) // No utopias

      const newAnswers = ['new1', 'new2', 'new3']
      await updateUserArchetype('user-123', 'visionary', 'builder', { visionary: 15 }, newAnswers)

      // Should encrypt new answers
      expect(mockEncrypt).toHaveBeenCalledWith(JSON.stringify(newAnswers))

      // Should save with encrypted answers
      expect(mockRedisInstance.set).toHaveBeenCalled()
      const savedData = JSON.parse((mockRedisInstance.set as jest.Mock).mock.calls[0][1])
      expect(savedData.answers).toBe('encrypted_["new1","new2","new3"]')
      expect(savedData.archetype).toBe('visionary')
    })
  })

  describe('encryption round-trip', () => {
    it('should handle full save and retrieve cycle with real crypto', async () => {
      // This test uses real crypto functions instead of mocks
      jest.unmock('./crypto')
      const realCrypto = jest.requireActual('./crypto')

      // Setup test encryption key
      process.env.DATA_ENCRYPTION_KEY = 'emIZ2tdPe/JCyvQ/vYHu1lj0BEa7FXqMgofmrLY2qYs='

      const userResult: UserResult = {
        id: generateUserId(),
        name: 'Real Test',
        email: 'real@example.com',
        archetype: 'builder',
        secondaryArchetype: 'visionary',
        scores: { builder: 10 },
        answers: ['answer1', 'answer2', 'answer3'],
        createdAt: new Date().toISOString(),
      }

      // Mock Redis but use real crypto
      let savedData: string | null = null
      mockRedisInstance.set.mockImplementation(async (_key: string, data: string) => {
        savedData = data
        return 'OK'
      })
      mockRedisInstance.get.mockImplementation(async (_key: string) => savedData)

      // Save with encryption
      mockEncrypt.mockImplementation(realCrypto.encrypt)
      mockDecrypt.mockImplementation(realCrypto.decrypt)
      mockIsEncrypted.mockImplementation(realCrypto.isEncrypted)

      await saveUserResult(userResult)

      // Verify data was encrypted
      expect(savedData).toBeTruthy()
      const parsedData = JSON.parse(savedData!)
      expect(realCrypto.isEncrypted(parsedData.email)).toBe(true)
      expect(realCrypto.isEncrypted(parsedData.answers)).toBe(true)

      // Retrieve and verify decryption
      const retrieved = await getUserResult(userResult.id)
      expect(retrieved).toEqual(userResult)
    })
  })
})
