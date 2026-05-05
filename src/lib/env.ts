/**
 * Environment variable validation
 *
 * Validates all required environment variables at startup.
 * Throws detailed errors if any variables are missing or invalid.
 */

interface ValidationError {
  variable: string
  message: string
}

/**
 * Validates that all required environment variables are set and valid
 * @throws Error if any validation fails
 */
export function validateEnv(): void {
  const errors: ValidationError[] = []

  // Validate DATA_ENCRYPTION_KEY
  const encryptionKey = process.env.DATA_ENCRYPTION_KEY
  if (!encryptionKey) {
    errors.push({
      variable: 'DATA_ENCRYPTION_KEY',
      message: 'Required environment variable is not set'
    })
  } else {
    // Check if it's valid base64
    try {
      const buffer = Buffer.from(encryptionKey, 'base64')
      // Verify it can be re-encoded
      if (buffer.toString('base64') !== encryptionKey.replace(/\s/g, '')) {
        errors.push({
          variable: 'DATA_ENCRYPTION_KEY',
          message: 'Must be valid base64 encoded string'
        })
      } else if (buffer.length !== 32) {
        errors.push({
          variable: 'DATA_ENCRYPTION_KEY',
          message: 'Must be 32 bytes (256 bits) when decoded'
        })
      }
    } catch (error) {
      errors.push({
        variable: 'DATA_ENCRYPTION_KEY',
        message: 'Must be valid base64 encoded string'
      })
    }
  }

  // Validate ADMIN_API_KEY
  const adminApiKey = process.env.ADMIN_API_KEY
  if (!adminApiKey) {
    errors.push({
      variable: 'ADMIN_API_KEY',
      message: 'Required environment variable is not set'
    })
  } else if (adminApiKey.length < 16) {
    errors.push({
      variable: 'ADMIN_API_KEY',
      message: 'Must be at least 16 characters long'
    })
  }

  // Validate UNSUBSCRIBE_SECRET
  const unsubscribeSecret = process.env.UNSUBSCRIBE_SECRET
  if (!unsubscribeSecret) {
    errors.push({
      variable: 'UNSUBSCRIBE_SECRET',
      message: 'Required environment variable is not set'
    })
  } else if (unsubscribeSecret.length < 32) {
    errors.push({
      variable: 'UNSUBSCRIBE_SECRET',
      message: 'Must be at least 32 characters long'
    })
  }

  // Validate UPSTASH_REDIS_REST_URL
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  if (!redisUrl) {
    errors.push({
      variable: 'UPSTASH_REDIS_REST_URL',
      message: 'Required environment variable is not set'
    })
  } else {
    try {
      const url = new URL(redisUrl)
      if (url.protocol !== 'https:') {
        errors.push({
          variable: 'UPSTASH_REDIS_REST_URL',
          message: 'Must be a valid HTTPS URL'
        })
      }
    } catch (error) {
      errors.push({
        variable: 'UPSTASH_REDIS_REST_URL',
        message: 'Must be a valid HTTPS URL'
      })
    }
  }

  // Validate UPSTASH_REDIS_REST_TOKEN
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!redisToken) {
    errors.push({
      variable: 'UPSTASH_REDIS_REST_TOKEN',
      message: 'Required environment variable is not set'
    })
  } else if (redisToken.length < 16) {
    errors.push({
      variable: 'UPSTASH_REDIS_REST_TOKEN',
      message: 'Must be at least 16 characters long'
    })
  }

  // If there are any errors, throw with detailed message
  if (errors.length > 0) {
    const errorCount = errors.length
    const errorMessages = errors.map(err => `  - ${err.variable}: ${err.message}`).join('\n')

    throw new Error(
      `Environment validation failed with ${errorCount} validation error${errorCount > 1 ? 's' : ''}:\n${errorMessages}\n\n` +
      'Please check your .env.local file and ensure all required variables are set correctly.'
    )
  }
}
