/**
 * Test Credential Management
 *
 * Provides secure access to test user credentials via environment variables.
 * This prevents hardcoded credentials from being committed to the repository.
 *
 * @module tests/fixtures/credentials
 *
 * @security
 * - All credentials MUST be stored in .env file (gitignored)
 * - Never hardcode credentials in source code
 * - Use getTestCredentials() in all test files
 *
 * @example
 * ```typescript
 * import { getTestCredentials } from '../fixtures/credentials'
 *
 * const { email, password } = getTestCredentials('admin')
 * await signInAsUser(supabase, email, password)
 * ```
 */

export type TestRole = 'admin' | 'client' | 'unauthorized'

export interface TestCredentials {
  email: string
  password: string
}

/**
 * Get test credentials for a specific role from environment variables
 *
 * @param role - The test role to get credentials for
 * @returns Test credentials object with email and password
 * @throws Error if credentials are not configured in environment
 *
 * @security
 * Credentials are loaded from environment variables:
 * - TEST_ADMIN_EMAIL / TEST_ADMIN_PASSWORD
 * - TEST_CLIENT_EMAIL / TEST_CLIENT_PASSWORD
 * - TEST_UNAUTHORIZED_EMAIL / TEST_UNAUTHORIZED_PASSWORD
 *
 * @example
 * ```typescript
 * // Get admin credentials
 * const adminCreds = getTestCredentials('admin')
 * // Returns: { email: 'your-admin@example.com', password: '...' }
 *
 * // Get client credentials
 * const clientCreds = getTestCredentials('client')
 * // Returns: { email: 'your-client@example.com', password: '...' }
 * ```
 */
export function getTestCredentials(role: TestRole): TestCredentials {
  const envMap: Record<TestRole, { emailKey: string; passwordKey: string }> = {
    admin: {
      emailKey: 'TEST_ADMIN_EMAIL',
      passwordKey: 'TEST_ADMIN_PASSWORD',
    },
    client: {
      emailKey: 'TEST_CLIENT_EMAIL',
      passwordKey: 'TEST_CLIENT_PASSWORD',
    },
    unauthorized: {
      emailKey: 'TEST_UNAUTHORIZED_EMAIL',
      passwordKey: 'TEST_UNAUTHORIZED_PASSWORD',
    },
  }

  const { emailKey, passwordKey } = envMap[role]
  const email = process.env[emailKey]
  const password = process.env[passwordKey]

  if (!email || !password) {
    throw new Error(
      `Missing test credentials for role "${role}". ` +
        `Please set ${emailKey} and ${passwordKey} in your .env file. ` +
        `See .env.example for template.`
    )
  }

  return { email, password }
}

/**
 * Get all configured test credentials
 *
 * @returns Map of all test credentials by role
 * @throws Error if any credentials are missing
 *
 * @example
 * ```typescript
 * const allCreds = getAllTestCredentials()
 * // Returns: {
 * //   admin: { email: '...', password: '...' },
 * //   client: { email: '...', password: '...' },
 * //   unauthorized: { email: '...', password: '...' }
 * // }
 * ```
 */
export function getAllTestCredentials(): Record<TestRole, TestCredentials> {
  return {
    admin: getTestCredentials('admin'),
    client: getTestCredentials('client'),
    unauthorized: getTestCredentials('unauthorized'),
  }
}

/**
 * Check if test credentials are configured in environment
 *
 * @returns true if all required credentials are present, false otherwise
 *
 * @example
 * ```typescript
 * if (!areCredentialsConfigured()) {
 *   console.warn('Test credentials not configured - some tests may be skipped')
 * }
 * ```
 */
export function areCredentialsConfigured(): boolean {
  const requiredVars = [
    'TEST_ADMIN_EMAIL',
    'TEST_ADMIN_PASSWORD',
    'TEST_CLIENT_EMAIL',
    'TEST_CLIENT_PASSWORD',
    'TEST_UNAUTHORIZED_EMAIL',
    'TEST_UNAUTHORIZED_PASSWORD',
  ]

  return requiredVars.every((key) => process.env[key] !== undefined && process.env[key] !== '')
}
