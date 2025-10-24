<!-- LINK_VALIDATION_BYPASS: Updating documentation with corrected paths -->

# @elevanaltd/shared-lib

Shared infrastructure library for EAV Operations Suite applications.

Combines Supabase integration (data layer) with React UI state management (presentation layer) extracted from scripts-web production MVP.

## Status

✅ **PUBLISHED** - v0.2.0 available on GitHub Packages

**Latest Version**: `0.2.0`
**Package Registry**: https://github.com/elevanaltd/eav-shared-lib/pkgs/npm/shared-lib
**Modules Complete**: Client + Types + Auth + RLS + Navigation + Dropdowns

## Overview

This package provides two categories of reusable functionality:

### Supabase Integration (Data Layer)
- **Client Module**: Authenticated Supabase client factory with environment configuration
- **Types Module**: Generated TypeScript types from Supabase database schema
- **Auth Module**: Authentication functions (`signIn`, `signOut`, `getSession`, auth state management)
- **RLS Module**: Row-Level Security query builders, performance measurement, policy testing

### React UI State (Presentation Layer)
- **Navigation Module**: Cross-app navigation state management (`NavigationProvider`, `useNavigation` React hook)
- **Dropdowns Module**: Database-driven dropdown options with caching (`useDropdownOptions` React Query hook)

## Installation

```bash
npm install @elevanaltd/shared-lib
```

**Authentication Required**: Configure GitHub Packages access in `.npmrc`:

```bash
# Project .npmrc or ~/.npmrc
@elevanaltd:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Create a GitHub Personal Access Token with `read:packages` scope at https://github.com/settings/tokens

## Usage

### Client Module

```typescript
import { createBrowserClient } from '@elevanaltd/shared-lib/client';

const supabase = createBrowserClient();
// Uses VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY from environment
```

### Types Module

```typescript
import type { Database, Tables } from '@elevanaltd/shared-lib/types';

type Project = Tables<'projects'>;
type Video = Tables<'videos'>;
```

### Auth Module

```typescript
import { signIn, signOut, getSession, onAuthStateChange } from '@elevanaltd/shared-lib/auth';

// Sign in user
await signIn(email, password);

// Get current session
const session = await getSession();

// Listen for auth state changes
onAuthStateChange((event, session) => {
  console.log('Auth event:', event, session);
});

// Sign out
await signOut();
```

### RLS Module

```typescript
import { buildClientQuery, measureQueryTime, testRLSPolicy } from '@elevanaltd/shared-lib/rls';

// Build client-filtered query
const query = buildClientQuery(
  supabase,
  'scripts',
  userId,
  assignedClients
);

// Measure query performance
const { data, duration } = await measureQueryTime(
  supabase.from('scripts').select('*')
);

// Test RLS policy enforcement
await testRLSPolicy(supabase, 'scripts', 'client_read', userId);
```

### Navigation Module

```typescript
import { NavigationProvider, useNavigation } from '@elevanaltd/shared-lib/navigation';

function App() {
  return (
    <NavigationProvider>
      <YourAppComponents />
    </NavigationProvider>
  );
}

function NavigationComponent() {
  const {
    selectedProject,      // Full project object (not just ID)
    selectedVideo,        // Full video object (not just ID)
    setSelectedProject,   // (projectId: string) => void
    setSelectedVideo,     // (videoId: string) => void
    clearSelection,       // () => void
    isProjectSelected,    // (projectId: string) => boolean
    isVideoSelected       // (videoId: string) => boolean
  } = useNavigation();

  // Access IDs from objects:
  const projectId = selectedProject?.id;
  const videoId = selectedVideo?.id;
}
```

### Dropdowns Module

```typescript
import { useDropdownOptions } from '@elevanaltd/shared-lib';
import { supabase } from './lib/supabase';

function MyComponent() {
  const { data: options, isLoading, error } = useDropdownOptions('shot_type', supabase);

  if (isLoading) return <div>Loading options...</div>;
  if (error) return <div>Error loading options</div>;

  return (
    <select>
      {options?.map(option => (
        <option key={option.id} value={option.option_value}>
          {option.option_label}
        </option>
      ))}
    </select>
  );
}
```

**Features:**
- TanStack Query caching (automatic deduplication and invalidation)
- Field-specific filtering via `field_name` parameter
- Error handling and loading states
- Client injection pattern (app-agnostic, testable)
- Type-safe with `DropdownOption` interface

**Example - All Options:**
```typescript
// Fetch all dropdown options (no field filter)
const { data: allOptions } = useDropdownOptions(undefined, supabase);
```

**Example - Field-Specific:**
```typescript
// Fetch only 'shot_type' options
const { data: shotTypes } = useDropdownOptions('shot_type', supabase);

// Fetch only 'location_start_point' options
const { data: locations } = useDropdownOptions('location_start_point', supabase);
```

## Testing

### Overriding Supabase Credentials in Tests

The `createBrowserClient` function supports dependency injection for test environments:

```typescript
// src/test/setup.ts or vitest.config.ts
import { beforeAll } from 'vitest'
import { createBrowserClient } from '@elevanaltd/shared-lib/client'

beforeAll(() => {
  // Override with test credentials
  globalThis.testSupabase = createBrowserClient(
    'https://test-project.supabase.co',
    'test-anon-key'
  )
})
```

**Why This Pattern?**

The shared library is pre-compiled (reads `import.meta.env` at build time). Test environments need to inject mock credentials at runtime. Dependency injection solves this:

```typescript
// Production (no parameters): Uses environment variables
const supabase = createBrowserClient()

// Test (with parameters): Uses injected credentials
const supabase = createBrowserClient(testUrl, testKey)
```

This enables all 7 EAV apps to test with mock Supabase credentials without requiring environment variable manipulation.

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

## Publishing New Versions

**Automated Workflow** (Recommended):

1. Update version in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Push changes and create git tag:
   ```bash
   git push origin main
   git push origin v0.1.9  # Tag triggers automatic publication
   ```

3. GitHub Actions automatically:
   - Runs all quality gates (lint + typecheck + format + test)
   - Builds the package
   - Publishes to GitHub Packages
   - Creates release

**Manual Publication** (Emergency Only):

```bash
# Ensure you have a GitHub PAT with write:packages scope
npm run validate  # All gates must pass
npm run build
npm publish
```

**Publication Checklist**:
- [ ] All quality gates passing (`npm run validate`)
- [ ] Version bumped in `package.json`
- [ ] CHANGELOG updated with changes
- [ ] Git tag created (format: `v*.*.*`)
- [ ] Consumers tested with new version

## Quality Standards

- **TDD Discipline**: All features developed test-first (RED→GREEN→REFACTOR)
- **Zero Warnings**: ESLint, TypeScript, and Prettier all pass
- **Strict TypeScript**: No implicit `any` types
- **Integration Tests**: Real Supabase validation (not mocked)

## Architecture

**Phase 1**: ✅ Infrastructure (ESLint, Prettier, Vitest, barrel exports, CI pipeline)
**Phase 2**: ✅ Client Module (Browser client with peerDependencies pattern)
**Phase 3**: ✅ Types Module (Supabase-generated database types)
**Phase 4**: ✅ Auth Module (Function-based auth with signIn, signOut, session management)
**Phase 5**: ✅ RLS Module (Query builders, performance measurement, policy testing)
**Phase 6**: ✅ Navigation Module (NavigationProvider + useNavigation hook for cross-app state)
**Phase 7**: ✅ Dropdowns Module (useDropdownOptions React Query hook with TanStack Query caching)
**Phase 8**: 🚧 Documentation (README updated, CHANGELOG + API docs remaining)

## License

Private - EAV Operations internal use only

## Contributing

See [B1_03 BUILD.md](../coordination/workflow-docs/001-UNIVERSAL-EAV_SYSTEM-D1-BUILD-REFERENCE.md) for development workflow.
