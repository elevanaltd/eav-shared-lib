# Test Fixtures - Credential Management

## Security Remediation

This directory contains the secure credential management pattern for test users.

### Background

GitGuardian flagged hardcoded credentials in our codebase. To remediate:

1. **Removed all hardcoded credentials** from source code
2. **Created environment variable pattern** via `.env` file
3. **Implemented credential factory** for type-safe test credential access
4. **Updated all tests** to use mock credentials or credential factory

### Usage Pattern

#### For Unit Tests (Mocked Supabase)

Use mock credentials that DO NOT match real Supabase users:

```typescript
// ✅ SAFE: Mock credentials for unit tests
const mockClient = {
  auth: {
    signInWithPassword: vi.fn().mockResolvedValue({
      data: { user: { id: 'mock-id' }, session: {} },
      error: null
    })
  }
}

// Use clearly fake credentials
await signInAsUser(mockClient, 'mock-admin@test.com', 'mock-password')
```

#### For Integration Tests (Real Supabase)

Use the credential factory with environment variables:

```typescript
import { getTestCredentials } from './fixtures/credentials.js'

// ✅ SECURE: Credentials loaded from .env file
const { email, password } = getTestCredentials('admin')
await signInAsUser(supabaseClient, email, password)
```

### Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with actual test credentials from Supabase:
   ```bash
   TEST_ADMIN_EMAIL=your-admin@example.com
   TEST_ADMIN_PASSWORD=<actual-password-from-supabase>
   TEST_CLIENT_EMAIL=your-client@example.com
   TEST_CLIENT_PASSWORD=<actual-password-from-supabase>
   ```

3. Run tests:
   ```bash
   npm test
   ```

### Available Test Users (from Supabase)

Based on Supabase query 2025-10-18:

- **Admin User**
  - Email: `your-admin@example.com`
  - Role: Admin
  - Created: 2025-09-29

- **Client User**
  - Email: `your-client@example.com`
  - Role: Client (assigned to test-client-company)
  - Created: 2025-09-29

- **Unauthorized User**
  - Email: `your-unauthorized@example.com`
  - Role: None (no client assignments)
  - Created: 2025-09-29

### Security Guidelines

**NEVER** commit to repository:
- ❌ Actual passwords in source code
- ❌ `.env` file (gitignored automatically)
- ❌ Test credentials in JSDoc examples

**ALWAYS** use:
- ✅ Mock credentials for unit tests (`mock-*@test.com`)
- ✅ Environment variables for integration tests
- ✅ Credential factory pattern (`getTestCredentials()`)
- ✅ Clear documentation referencing credential factory

### CI/CD Setup

For GitHub Actions, set repository secrets:

1. Go to: Settings → Secrets and variables → Actions
2. Add secrets:
   - `TEST_ADMIN_EMAIL`
   - `TEST_ADMIN_PASSWORD`
   - `TEST_CLIENT_EMAIL`
   - `TEST_CLIENT_PASSWORD`
   - `TEST_UNAUTHORIZED_EMAIL`
   - `TEST_UNAUTHORIZED_PASSWORD`

3. Reference in workflow:
   ```yaml
   - name: Run tests
     env:
       TEST_ADMIN_EMAIL: ${{ secrets.TEST_ADMIN_EMAIL }}
       TEST_ADMIN_PASSWORD: ${{ secrets.TEST_ADMIN_PASSWORD }}
       # ... other credentials
     run: npm test
   ```

### Credential Factory API

```typescript
// Get credentials for specific role
const adminCreds = getTestCredentials('admin')
const clientCreds = getTestCredentials('client')
const unauthorizedCreds = getTestCredentials('unauthorized')

// Get all credentials
const allCreds = getAllTestCredentials()

// Check if credentials are configured
if (areCredentialsConfigured()) {
  // Run integration tests
} else {
  console.warn('Skipping tests - credentials not configured')
}
```

### Migration Checklist

- [x] Created `.env.example` with template
- [x] Created credential factory (`credentials.ts`)
- [x] Updated `rls.test.ts` to use mock credentials
- [x] Verified no hardcoded real credentials remain
- [x] Documented usage patterns in this README
- [ ] Update JSDoc examples in source files (pending hook resolution)
- [ ] Update CI/CD with repository secrets
- [ ] Verify GitGuardian passes on PR

---

**Last Updated:** 2025-10-18
**GitGuardian Issue:** https://github.com/elevanaltd/eav-shared-lib/pull/4
