/**
 * Input Validation Module
 *
 * Provides comprehensive validation utilities for user inputs with security-first design.
 * All validators throw ValidationError on invalid input and return the validated value on success.
 */

/**
 * Custom error class for validation failures
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Validates email address according to RFC 5322 compliant pattern.
 * Maximum length: 254 characters (RFC 5321)
 *
 * @param email - Email address to validate
 * @returns The validated email address
 * @throws ValidationError if email is invalid
 */
export function validateEmail(email: string): string {
  // Check maximum length (RFC 5321)
  if (email.length > 254) {
    throw new ValidationError('Email must not exceed 254 characters')
  }

  // Check for null bytes
  if (email.includes('\0')) {
    throw new ValidationError('Invalid email format')
  }

  // RFC 5322 compliant email regex
  // This pattern validates:
  // - Local part: alphanumeric, dots, hyphens, underscores, plus signs
  // - No consecutive dots, no dots at start/end
  // - Domain: alphanumeric, hyphens, dots
  // - TLD: at least 2 characters
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._+-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/

  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format')
  }

  // Additional validation: check for consecutive dots
  if (email.includes('..')) {
    throw new ValidationError('Invalid email format')
  }

  // Validate TLD is at least 2 characters
  const parts = email.split('@')
  if (parts.length !== 2) {
    throw new ValidationError('Invalid email format')
  }
  const domain = parts[1]
  const tld = domain.split('.').pop()
  if (!tld || tld.length < 2) {
    throw new ValidationError('Invalid email format')
  }

  return email
}

/**
 * Sanitizes and validates user name.
 * - Trims whitespace
 * - Removes HTML tags and brackets
 * - Maximum length: 50 characters
 * - Allows: letters, spaces, hyphens, apostrophes
 *
 * @param name - Name to sanitize and validate
 * @returns The sanitized name
 * @throws ValidationError if name is invalid
 */
export function sanitizeName(name: string): string {
  // Trim whitespace
  let sanitized = name.trim()

  // Check for empty name
  if (!sanitized) {
    throw new ValidationError('Name cannot be empty')
  }

  // Check for null bytes
  if (sanitized.includes('\0')) {
    throw new ValidationError('Name contains invalid characters')
  }

  // Remove HTML tags and brackets (prevents XSS)
  sanitized = sanitized.replace(/<[^>]*>/g, '')

  // Check for empty name after sanitization
  if (!sanitized) {
    throw new ValidationError('Name cannot be empty')
  }

  // Check maximum length
  if (sanitized.length > 50) {
    throw new ValidationError('Name must not exceed 50 characters')
  }

  // Validate characters: only letters (a-z, A-Z), spaces, hyphens, apostrophes
  // No numbers, no special characters except hyphen and apostrophe
  const nameRegex = /^[a-zA-Z]([a-zA-Z\s'-]*[a-zA-Z])?$/

  if (!nameRegex.test(sanitized)) {
    throw new ValidationError('Name contains invalid characters')
  }

  // Additional check: no consecutive special characters
  if (sanitized.includes('--') || sanitized.includes("''") || sanitized.includes('  ')) {
    throw new ValidationError('Name contains invalid characters')
  }

  return sanitized
}

/**
 * Validates utopia slug.
 * - Length: 3-30 characters
 * - Lowercase only
 * - Alphanumeric and hyphens only
 * - Cannot start or end with hyphen
 * - No consecutive hyphens
 *
 * @param slug - Slug to validate
 * @returns The validated slug
 * @throws ValidationError if slug is invalid
 */
export function validateSlug(slug: string): string {
  // Check length
  if (slug.length < 3 || slug.length > 30) {
    throw new ValidationError('Slug must be 3-30 characters')
  }

  // Check for null bytes
  if (slug.includes('\0')) {
    throw new ValidationError('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  // Validate format: lowercase alphanumeric with hyphens
  // Cannot start or end with hyphen, no consecutive hyphens
  const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/

  if (!slugRegex.test(slug)) {
    throw new ValidationError('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  return slug
}

/**
 * Validates UUID v4 format for user IDs.
 * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * where x is any hexadecimal digit and y is one of 8, 9, a, or b
 *
 * @param userId - User ID to validate
 * @returns The validated user ID
 * @throws ValidationError if user ID is invalid
 */
export function validateUserId(userId: string): string {
  // UUID v4 format with proper version and variant bits
  // Version 4: 3rd group starts with 4
  // Variant: 4th group starts with 8, 9, a, or b
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (!uuidV4Regex.test(userId)) {
    throw new ValidationError('Invalid user ID format')
  }

  return userId
}

/**
 * Validates quiz answers array.
 * - Must be array of exactly 7 answers
 * - Each answer must be uppercase letter
 * - Each question has specific valid answer range:
 *   - Q1: A-F (6 options)
 *   - Q2: A-F (6 options)
 *   - Q3: A-E (5 options)
 *   - Q4: A-F (6 options)
 *   - Q5: A-F (6 options)
 *   - Q6: A-G (7 options)
 *   - Q7: A-G (7 options)
 *
 * @param answers - Array of quiz answers to validate
 * @returns The validated answers array
 * @throws ValidationError if answers are invalid
 */
export function validateQuizAnswers(answers: unknown): string[] {
  // Check if answers is an array
  if (!Array.isArray(answers)) {
    throw new ValidationError('Quiz answers must be an array')
  }

  // Check exactly 7 answers
  if (answers.length !== 7) {
    throw new ValidationError('Quiz must have exactly 7 answers')
  }

  // Define valid options for each question (1-indexed for better error messages)
  const validOptions: Record<number, string[]> = {
    1: ['A', 'B', 'C', 'D', 'E', 'F'],
    2: ['A', 'B', 'C', 'D', 'E', 'F'],
    3: ['A', 'B', 'C', 'D', 'E'],
    4: ['A', 'B', 'C', 'D', 'E', 'F'],
    5: ['A', 'B', 'C', 'D', 'E', 'F'],
    6: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    7: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  }

  // Validate each answer
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    const questionNum = i + 1

    // Check if answer is a string
    if (typeof answer !== 'string') {
      throw new ValidationError(`Invalid answer for question ${questionNum}`)
    }

    // Check if answer is in valid options for this question
    if (!validOptions[questionNum].includes(answer)) {
      throw new ValidationError(`Invalid answer for question ${questionNum}`)
    }
  }

  return answers as string[]
}
