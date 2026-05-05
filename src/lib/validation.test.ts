import {
  ValidationError,
  validateEmail,
  sanitizeName,
  validateSlug,
  validateUserId,
  validateQuizAnswers
} from './validation'

describe('Input Validation Module', () => {
  describe('ValidationError', () => {
    it('should create error with correct properties', () => {
      const error = new ValidationError('Test message')
      expect(error.message).toBe('Test message')
      expect(error.name).toBe('ValidationError')
      expect(error).toBeInstanceOf(Error)
    })
  })

  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.user@example.com',
        'user+tag@example.co.uk',
        'user_name@example-domain.com',
        'a@b.co',
        'test123@test456.com',
        'user@subdomain.example.com',
        'firstname.lastname@example.com',
        'email@example-one.com',
        '1234567890@example.com',
      ]

      validEmails.forEach(email => {
        expect(() => validateEmail(email)).not.toThrow()
        expect(validateEmail(email)).toBe(email)
      })
    })

    it('should reject emails exceeding 254 characters', () => {
      const longEmail = 'a'.repeat(240) + '@example.com' // 252 chars total
      expect(() => validateEmail(longEmail)).not.toThrow()

      const tooLongEmail = 'a'.repeat(243) + '@example.com' // 255 chars total
      expect(() => validateEmail(tooLongEmail)).toThrow(ValidationError)
      expect(() => validateEmail(tooLongEmail)).toThrow('Email must not exceed 254 characters')
    })

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
        'user..name@example.com',
        '.user@example.com',
        'user.@example.com',
        'user@.example.com',
        'user@example..com',
        'user name@example.com',
        'user@exam ple.com',
        'user@@example.com',
        'user@example.com.',
        'user@-example.com',
        'user@example-.com',
        '<user@example.com>',
        'user@[example.com]',
      ]

      invalidEmails.forEach(email => {
        expect(() => validateEmail(email)).toThrow(ValidationError)
        expect(() => validateEmail(email)).toThrow('Invalid email format')
      })
    })

    it('should reject emails with invalid characters', () => {
      expect(() => validateEmail('user@exam$ple.com')).toThrow(ValidationError)
      expect(() => validateEmail('us#er@example.com')).toThrow(ValidationError)
      expect(() => validateEmail('user@example.com\n')).toThrow(ValidationError)
    })

    it('should handle edge cases', () => {
      // Valid edge cases
      expect(() => validateEmail('x@y.zz')).not.toThrow()
      expect(() => validateEmail('test@test.museum')).not.toThrow()

      // Invalid edge cases
      expect(() => validateEmail('a@b.c')).toThrow(ValidationError) // TLD too short
      expect(() => validateEmail('x@y.z')).toThrow(ValidationError) // TLD too short
    })
  })

  describe('sanitizeName', () => {
    it('should accept valid names', () => {
      const validNames = [
        'John Doe',
        'Mary-Jane',
        "O'Brien",
        'Jean-Pierre',
        'Anna Maria',
        'John',
        'A',
      ]

      validNames.forEach(name => {
        expect(() => sanitizeName(name)).not.toThrow()
        expect(sanitizeName(name)).toBe(name)
      })
    })

    it('should trim whitespace', () => {
      expect(sanitizeName('  John Doe  ')).toBe('John Doe')
      expect(sanitizeName('\tJohn\t')).toBe('John')
      expect(sanitizeName('  Mary  ')).toBe('Mary')
    })

    it('should reject names exceeding 50 characters', () => {
      const validLongName = 'A'.repeat(50)
      expect(() => sanitizeName(validLongName)).not.toThrow()

      const tooLongName = 'A'.repeat(51)
      expect(() => sanitizeName(tooLongName)).toThrow(ValidationError)
      expect(() => sanitizeName(tooLongName)).toThrow('Name must not exceed 50 characters')
    })

    it('should remove HTML tags and brackets', () => {
      expect(sanitizeName('John<b>Middle</b>Doe')).toBe('JohnMiddleDoe')
      expect(sanitizeName('Mary<span>Anne</span>Jane')).toBe('MaryAnneJane')
      expect(sanitizeName('Test<>Name')).toBe('TestName')
      expect(sanitizeName('<div>Robert</div>')).toBe('Robert')

      // Should reject if HTML removal leaves invalid characters
      expect(() => sanitizeName('John<script>123</script>Doe')).toThrow(ValidationError)
      expect(() => sanitizeName('Name<tag>123<tags>Stuff')).toThrow(ValidationError)

      // Should reject if only HTML tags remain
      expect(() => sanitizeName('<<>>')).toThrow(ValidationError)
      expect(() => sanitizeName('<div></div>')).toThrow(ValidationError)
    })

    it('should reject invalid characters', () => {
      const invalidNames = [
        'John@Doe',
        'Mary#Jane',
        'User123',
        'Test$Name',
        'Name!',
        'John&Doe',
        'Test*Name',
        'Name()',
        'User=Test',
        'Name+Test',
        'Test_User',
      ]

      invalidNames.forEach(name => {
        expect(() => sanitizeName(name)).toThrow(ValidationError)
        expect(() => sanitizeName(name)).toThrow('Name contains invalid characters')
      })
    })

    it('should reject empty or whitespace-only names', () => {
      expect(() => sanitizeName('')).toThrow(ValidationError)
      expect(() => sanitizeName('   ')).toThrow(ValidationError)
      expect(() => sanitizeName('\t\n')).toThrow(ValidationError)
    })

    it('should allow apostrophes and hyphens in valid positions', () => {
      expect(sanitizeName("O'Brien")).toBe("O'Brien")
      expect(sanitizeName('Mary-Jane')).toBe('Mary-Jane')
      expect(sanitizeName('Jean-Pierre Louis')).toBe('Jean-Pierre Louis')
    })
  })

  describe('validateSlug', () => {
    it('should accept valid slugs', () => {
      const validSlugs = [
        'my-utopia',
        'test-123',
        'abc',
        'my-awesome-utopia-name',
        'slug-with-multiple-hyphens',
        'a-b-c',
        'test1',
        '123',
      ]

      validSlugs.forEach(slug => {
        expect(() => validateSlug(slug)).not.toThrow()
        expect(validateSlug(slug)).toBe(slug)
      })
    })

    it('should enforce minimum length of 3 characters', () => {
      expect(() => validateSlug('ab')).toThrow(ValidationError)
      expect(() => validateSlug('a')).toThrow(ValidationError)
      expect(() => validateSlug('')).toThrow(ValidationError)
      expect(() => validateSlug('abc')).not.toThrow()
    })

    it('should enforce maximum length of 30 characters', () => {
      const validLongSlug = 'a'.repeat(30)
      expect(() => validateSlug(validLongSlug)).not.toThrow()

      const tooLongSlug = 'a'.repeat(31)
      expect(() => validateSlug(tooLongSlug)).toThrow(ValidationError)
      expect(() => validateSlug(tooLongSlug)).toThrow('Slug must be 3-30 characters')
    })

    it('should reject uppercase characters', () => {
      expect(() => validateSlug('MyUtopia')).toThrow(ValidationError)
      expect(() => validateSlug('my-Utopia')).toThrow(ValidationError)
      expect(() => validateSlug('MY-UTOPIA')).toThrow(ValidationError)
      expect(() => validateSlug('test-A')).toThrow(ValidationError)
    })

    it('should reject invalid characters', () => {
      const invalidSlugs = [
        'my_utopia',
        'my.utopia',
        'my utopia',
        'my@utopia',
        'my#utopia',
        'my!utopia',
        'my$utopia',
        'my%utopia',
        'my&utopia',
        'my*utopia',
        'my+utopia',
        'my=utopia',
        'my/utopia',
        'my\\utopia',
      ]

      invalidSlugs.forEach(slug => {
        expect(() => validateSlug(slug)).toThrow(ValidationError)
        expect(() => validateSlug(slug)).toThrow('Slug must contain only lowercase letters, numbers, and hyphens')
      })
    })

    it('should reject slugs starting or ending with hyphen', () => {
      expect(() => validateSlug('-my-utopia')).toThrow(ValidationError)
      expect(() => validateSlug('my-utopia-')).toThrow(ValidationError)
      expect(() => validateSlug('-test-')).toThrow(ValidationError)
    })

    it('should reject consecutive hyphens', () => {
      expect(() => validateSlug('my--utopia')).toThrow(ValidationError)
      expect(() => validateSlug('test---slug')).toThrow(ValidationError)
    })
  })

  describe('validateUserId', () => {
    it('should accept valid UUID v4 formats', () => {
      const validUUIDs = [
        '550e8400-e29b-41d4-a716-446655440000',
        '123e4567-e89b-42d3-a456-426614174000',
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        '00000000-0000-4000-8000-000000000000',
        'a3bb189e-8bf9-4d92-9c33-4deef1c3f7b5',
      ]

      validUUIDs.forEach(uuid => {
        expect(() => validateUserId(uuid)).not.toThrow()
        expect(validateUserId(uuid)).toBe(uuid)
      })
    })

    it('should accept both uppercase and lowercase UUIDs', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000'
      const upperUuid = '550E8400-E29B-41D4-A716-446655440000'

      expect(() => validateUserId(uuid)).not.toThrow()
      expect(() => validateUserId(upperUuid)).not.toThrow()
    })

    it('should reject invalid UUID formats', () => {
      const invalidUUIDs = [
        '',
        'not-a-uuid',
        '550e8400-e29b-41d4-a716', // too short
        '550e8400-e29b-41d4-a716-446655440000-extra', // too long
        '550e8400e29b41d4a716446655440000', // no hyphens
        '550e8400-e29b-41d4-a716-44665544000g', // invalid character
        '550e8400-e29b-41d4-a716-4466554400000', // wrong length in last group
        '550e8400-e29b-41d4-a716-44665544000', // last group too short
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', // invalid characters
        '550e8400-e29b-31d4-a716-446655440000', // version 3, not 4
      ]

      invalidUUIDs.forEach(uuid => {
        expect(() => validateUserId(uuid)).toThrow(ValidationError)
        expect(() => validateUserId(uuid)).toThrow('Invalid user ID format')
      })
    })

    it('should enforce UUID v4 version bit', () => {
      // Valid v4 (version nibble must be 4)
      expect(() => validateUserId('550e8400-e29b-41d4-a716-446655440000')).not.toThrow()
      expect(() => validateUserId('550e8400-e29b-4999-a716-446655440000')).not.toThrow()

      // Invalid versions
      expect(() => validateUserId('550e8400-e29b-11d4-8716-446655440000')).toThrow() // v1
      expect(() => validateUserId('550e8400-e29b-31d4-8716-446655440000')).toThrow() // v3
      expect(() => validateUserId('550e8400-e29b-51d4-8716-446655440000')).toThrow() // v5
    })

    it('should enforce UUID v4 variant bits', () => {
      // Valid variant (first nibble of 4th group should be 8, 9, a, or b)
      expect(() => validateUserId('550e8400-e29b-41d4-8716-446655440000')).not.toThrow()
      expect(() => validateUserId('550e8400-e29b-41d4-9716-446655440000')).not.toThrow()
      expect(() => validateUserId('550e8400-e29b-41d4-a716-446655440000')).not.toThrow()
      expect(() => validateUserId('550e8400-e29b-41d4-b716-446655440000')).not.toThrow()

      // Invalid variant
      expect(() => validateUserId('550e8400-e29b-41d4-0716-446655440000')).toThrow()
      expect(() => validateUserId('550e8400-e29b-41d4-c716-446655440000')).toThrow()
      expect(() => validateUserId('550e8400-e29b-41d4-f716-446655440000')).toThrow()
    })
  })

  describe('validateQuizAnswers', () => {
    it('should accept valid quiz answers', () => {
      const validAnswers = [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['F', 'F', 'E', 'F', 'F', 'G', 'G'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['C', 'D', 'B', 'E', 'C', 'D', 'F'],
      ]

      validAnswers.forEach(answers => {
        expect(() => validateQuizAnswers(answers)).not.toThrow()
        expect(validateQuizAnswers(answers)).toEqual(answers)
      })
    })

    it('should enforce exactly 7 answers', () => {
      expect(() => validateQuizAnswers(['A', 'B', 'C', 'D', 'E', 'F'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers([])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A'])).toThrow(ValidationError)
    })

    it('should reject non-array input', () => {
      expect(() => validateQuizAnswers('ABCDEFG' as any)).toThrow(ValidationError)
      expect(() => validateQuizAnswers({} as any)).toThrow(ValidationError)
      expect(() => validateQuizAnswers(null as any)).toThrow(ValidationError)
      expect(() => validateQuizAnswers(undefined as any)).toThrow(ValidationError)
    })

    it('should validate each question has correct answer range', () => {
      // Q1: A-F (6 options)
      expect(() => validateQuizAnswers(['G', 'A', 'A', 'A', 'A', 'A', 'A'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['F', 'A', 'A', 'A', 'A', 'A', 'A'])).not.toThrow()

      // Q2: A-F (6 options)
      expect(() => validateQuizAnswers(['A', 'G', 'A', 'A', 'A', 'A', 'A'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'F', 'A', 'A', 'A', 'A', 'A'])).not.toThrow()

      // Q3: A-E (5 options)
      expect(() => validateQuizAnswers(['A', 'A', 'F', 'A', 'A', 'A', 'A'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'A', 'E', 'A', 'A', 'A', 'A'])).not.toThrow()

      // Q4: A-F (6 options)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'G', 'A', 'A', 'A'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'F', 'A', 'A', 'A'])).not.toThrow()

      // Q5: A-F (6 options)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'A', 'G', 'A', 'A'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'A', 'F', 'A', 'A'])).not.toThrow()

      // Q6: A-G (7 options)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'A', 'A', 'H', 'A'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'A', 'A', 'G', 'A'])).not.toThrow()

      // Q7: A-G (7 options)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'A', 'A', 'A', 'H'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'A', 'A', 'A', 'A', 'A', 'G'])).not.toThrow()
    })

    it('should reject invalid answer types', () => {
      expect(() => validateQuizAnswers(['A', 'B', 'C', 'D', 'E', 'F', 1 as any])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'B', 'C', 'D', 'E', 'F', null as any])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'B', 'C', 'D', 'E', 'F', undefined as any])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'B', 'C', 'D', 'E', 'F', {} as any])).toThrow(ValidationError)
    })

    it('should reject lowercase answers', () => {
      expect(() => validateQuizAnswers(['a', 'B', 'C', 'D', 'E', 'F', 'G'])).toThrow(ValidationError)
      expect(() => validateQuizAnswers(['A', 'b', 'C', 'D', 'E', 'F', 'G'])).toThrow(ValidationError)
    })

    it('should provide specific error messages for invalid answers', () => {
      expect(() => validateQuizAnswers(['A', 'A', 'F', 'A', 'A', 'A', 'A']))
        .toThrow('Invalid answer for question 3')

      expect(() => validateQuizAnswers(['A', 'A', 'A', 'A', 'A', 'H', 'A']))
        .toThrow('Invalid answer for question 6')

      expect(() => validateQuizAnswers(['G', 'A', 'A', 'A', 'A', 'A', 'A']))
        .toThrow('Invalid answer for question 1')
    })
  })

  describe('Edge cases and security', () => {
    it('should handle null bytes in strings', () => {
      expect(() => validateEmail('user\0@example.com')).toThrow(ValidationError)
      expect(() => sanitizeName('John\0Doe')).toThrow(ValidationError)
      expect(() => validateSlug('my\0slug')).toThrow(ValidationError)
    })

    it('should handle very long strings gracefully', () => {
      const veryLong = 'a'.repeat(10000)

      expect(() => validateEmail(veryLong + '@example.com')).toThrow(ValidationError)
      expect(() => sanitizeName(veryLong)).toThrow(ValidationError)
      expect(() => validateSlug(veryLong)).toThrow(ValidationError)
    })

    it('should handle unicode characters appropriately', () => {
      // Email should reject unicode in domain
      expect(() => validateEmail('user@exämple.com')).toThrow(ValidationError)

      // Name should reject unicode (only ASCII letters allowed)
      expect(() => sanitizeName('José García')).toThrow(ValidationError)

      // Slug should reject unicode
      expect(() => validateSlug('mí-utopía')).toThrow(ValidationError)
    })
  })
})
