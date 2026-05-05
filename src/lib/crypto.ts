/**
 * Data Encryption Module
 *
 * Provides AES-256-GCM encryption/decryption utilities using Web Crypto API.
 * Uses DATA_ENCRYPTION_KEY from environment variables (32-byte base64 encoded).
 *
 * @module crypto
 */

/**
 * Custom error for encryption-related failures
 */
export class EncryptionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EncryptionError'
  }
}

/**
 * Retrieves and validates the encryption key from environment
 * @returns CryptoKey for AES-256-GCM operations
 * @throws {EncryptionError} If key is missing, invalid format, or wrong length
 */
async function getEncryptionKey(): Promise<CryptoKey> {
  const keyBase64 = process.env.DATA_ENCRYPTION_KEY

  if (!keyBase64) {
    throw new EncryptionError('DATA_ENCRYPTION_KEY not configured')
  }

  let keyBytes: Uint8Array
  try {
    const buffer = Buffer.from(keyBase64, 'base64')
    // Validate it's actually base64 by checking if re-encoding matches
    if (buffer.toString('base64') !== keyBase64.replace(/\s/g, '')) {
      throw new Error('Not valid base64')
    }
    keyBytes = Uint8Array.from(buffer)
  } catch (error) {
    throw new EncryptionError('Invalid encryption key format')
  }

  if (keyBytes.length !== 32) {
    throw new EncryptionError('Encryption key must be 32 bytes')
  }

  // Import the key for AES-GCM
  return await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypts plaintext using AES-256-GCM
 *
 * @param plaintext - The data to encrypt (string)
 * @returns Base64-encoded string containing IV + ciphertext + auth tag
 * @throws {EncryptionError} If encryption fails or key is invalid
 *
 * @example
 * const encrypted = await encrypt('sensitive@example.com')
 * // Returns: "ZXhhbXBsZS1pdg==" (base64 of IV + ciphertext)
 */
export async function encrypt(plaintext: string): Promise<string> {
  try {
    const key = await getEncryptionKey()

    // Generate random 12-byte IV for GCM mode
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Convert plaintext to bytes
    const encoder = new TextEncoder()
    const plaintextBytes = encoder.encode(plaintext)

    // Encrypt using AES-256-GCM
    const ciphertextBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: 128, // 16-byte authentication tag
      },
      key,
      plaintextBytes
    )

    const ciphertextBytes = new Uint8Array(ciphertextBuffer)

    // Combine IV + ciphertext (ciphertext includes auth tag)
    const combined = new Uint8Array(iv.length + ciphertextBytes.length)
    combined.set(iv, 0)
    combined.set(ciphertextBytes, iv.length)

    // Return as base64
    return Buffer.from(combined).toString('base64')
  } catch (error) {
    if (error instanceof EncryptionError) {
      throw error
    }
    throw new EncryptionError('Encryption failed: ' + (error as Error).message)
  }
}

/**
 * Decrypts ciphertext using AES-256-GCM
 *
 * @param ciphertext - Base64-encoded string containing IV + ciphertext + auth tag
 * @returns The decrypted plaintext string
 * @throws {EncryptionError} If decryption fails, ciphertext is tampered, or key is wrong
 *
 * @example
 * const decrypted = await decrypt('ZXhhbXBsZS1pdg==')
 * // Returns: "sensitive@example.com"
 */
export async function decrypt(ciphertext: string): Promise<string> {
  try {
    const key = await getEncryptionKey()

    // Decode from base64
    let combined: Uint8Array
    try {
      const buffer = Buffer.from(ciphertext, 'base64')
      // Validate it's actually base64
      if (buffer.toString('base64') !== ciphertext.replace(/\s/g, '')) {
        throw new Error('Not valid base64')
      }
      combined = Uint8Array.from(buffer)
    } catch (error) {
      throw new EncryptionError('Invalid ciphertext format')
    }

    // Validate minimum length: 12 bytes IV + 16 bytes auth tag
    if (combined.length < 28) {
      throw new EncryptionError('Ciphertext too short')
    }

    // Extract IV (first 12 bytes) and ciphertext (remaining bytes)
    const iv = combined.slice(0, 12)
    const ciphertextBytes = combined.slice(12)

    // Decrypt using AES-256-GCM
    let plaintextBuffer: ArrayBuffer
    try {
      plaintextBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
          tagLength: 128,
        },
        key,
        ciphertextBytes
      )
    } catch (error) {
      // This happens if auth tag verification fails (tampered data) or wrong key
      throw new EncryptionError('Decryption failed: authentication failed or wrong key')
    }

    // Convert bytes back to string
    const decoder = new TextDecoder()
    return decoder.decode(plaintextBuffer)
  } catch (error) {
    if (error instanceof EncryptionError) {
      throw error
    }
    throw new EncryptionError('Decryption failed: ' + (error as Error).message)
  }
}

/**
 * Checks if a value appears to be encrypted
 *
 * Uses heuristic checks:
 * - Must be valid base64
 * - Must be long enough (at least 28 bytes = 12 IV + 16 auth tag)
 * - Must not contain spaces or common plaintext patterns
 *
 * @param value - The value to check
 * @returns true if value appears encrypted, false otherwise
 *
 * @example
 * isEncrypted('hello@example.com') // false
 * isEncrypted('ZXhhbXBsZS1pdmFuZGNpcGhlcnRleHQ=') // true
 */
export function isEncrypted(value: string): boolean {
  // Empty or very short strings are not encrypted
  if (!value || value.length < 38) {
    // 28 bytes base64 encoded = at least 38 chars
    return false
  }

  // Check for common plaintext indicators
  if (value.includes(' ') || value.includes('@') || value.includes('-')) {
    return false
  }

  // Check if it's valid base64
  const base64Regex = /^[A-Za-z0-9+/]+=*$/
  if (!base64Regex.test(value)) {
    return false
  }

  // Try to decode and check length
  try {
    const decoded = Buffer.from(value, 'base64')
    // Must be at least 28 bytes (12 IV + 16 auth tag)
    return decoded.length >= 28
  } catch {
    return false
  }
}
