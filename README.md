# @eav-ops/shared-lib

Shared Supabase client library for EAV Operations Suite applications.

## Status

⚠️ **IN DEVELOPMENT** - Phase 1 (Infrastructure) complete, Phase 2 (Client Module) upcoming

## Overview

This package provides reusable Supabase patterns extracted from the scripts-web production MVP:
- **Client Module**: Authenticated client factory with configuration management
- **Types Module**: Generated TypeScript types from Supabase schema
- **Auth Module**: Authentication hooks (`useAuth`, `useUser`, `useSession`)
- **RLS Module**: Row-Level Security utilities and query builders

## Installation

```bash
npm install @eav-ops/shared-lib
```

*Note: Package not yet published - Phase 2+ required*

## Usage

### Client Module (Phase 2+)

```typescript
import { createClient } from '@eav-ops/shared-lib/client'

const supabase = createClient({
  url: process.env.SUPABASE_URL,
  anonKey: process.env.SUPABASE_ANON_KEY
})
```

### Types Module (Phase 3+)

```typescript
import type { Database, Tables } from '@eav-ops/shared-lib/types'

type Script = Tables<'scripts'>
```

### Auth Module (Phase 4+)

```typescript
import { useAuth } from '@eav-ops/shared-lib/auth'

function MyComponent() {
  const { currentUser, userProfile, signIn, logout } = useAuth()
  // ...
}
```

### RLS Module (Phase 5+)

```typescript
import { applyRLSFilters } from '@eav-ops/shared-lib/rls'

const query = applyRLSFilters(
  supabase.from('scripts').select('*'),
  { userId, role: 'client', clientFilter }
)
```

## Development

```bash
# Install dependencies
npm install

# Run quality gates
npm run validate

# Run tests
npm test

# Build package
npm run build
```

## Quality Standards

- **TDD Discipline**: All features developed test-first (RED→GREEN→REFACTOR)
- **Zero Warnings**: ESLint, TypeScript, and Prettier all pass
- **Strict TypeScript**: No implicit `any` types
- **Integration Tests**: Real Supabase validation (not mocked)

## Architecture

**Phase 1**: ✅ Infrastructure (ESLint, Prettier, Vitest, barrel exports)
**Phase 2**: 🚧 Client Module (Supabase client factory)
**Phase 3**: 📋 Types Module (Schema type generation)
**Phase 4**: 📋 Auth Module (Authentication hooks)
**Phase 5**: 📋 RLS Module (Query builders and filters)
**Phase 6**: 📋 Documentation & Publication

## License

Private - EAV Operations internal use only

## Contributing

See [B1_03 BUILD.md](../../eav-ops.coord/workflow-docs/001-UNIVERSAL-EAV_SYSTEM-D1-BUILD-REFERENCE.md) for development workflow.
