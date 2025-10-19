# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Dependency injection pattern for `createBrowserClient`
- Optional `url` and `key` parameters for test environment override
- Test override examples in README

### Changed
- `createBrowserClient` signature: `() => Client` → `(url?: string, key?: string) => Client`
- Maintains backward compatibility (no parameters still works)

### Fixed
- Consumer app test failures (cannot inject test credentials into pre-compiled library)
- Resolves scripts-web 8 environment errors

### Documentation
- Added "Testing" section to README with dependency injection examples
- Documented why pattern is needed (pre-compiled library limitation)

## [0.1.4] - 2025-10-18

### Added
- RLS utilities: `buildClientQuery`, `signInAsUser`, `testRLSPolicy`
- Query performance measurement: `measureQueryTime`, `createAuthDelay`
- Comprehensive RLS test suite (integration tests with real Supabase)

### Changed
- Improved type safety in RLS utilities
- Enhanced test coverage for auth and client queries

## [0.1.3] - 2025-10-17

### Added
- Auth module with framework-agnostic DI-based hooks
- `useAuth`, `useUser`, `useSession` hooks
- Comprehensive auth test suite

### Changed
- Improved error handling in auth hooks
- Enhanced TypeScript types for auth state

## [0.1.2] - 2025-10-16

### Added
- Types module with Supabase-generated database types
- Barrel exports for types
- Type safety improvements

## [0.1.1] - 2025-10-15

### Added
- Client module with browser client factory
- peerDependencies pattern for Supabase packages
- Environment variable configuration

### Changed
- Improved client initialization error handling

## [0.1.0] - 2025-10-14

### Added
- Initial project infrastructure
- ESLint, Prettier, Vitest configuration
- TypeScript strict mode
- CI pipeline with GitHub Actions
- Automated publication workflow

[Unreleased]: https://github.com/elevanaltd/eav-shared-lib/compare/v0.1.4...HEAD
[0.1.4]: https://github.com/elevanaltd/eav-shared-lib/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/elevanaltd/eav-shared-lib/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/elevanaltd/eav-shared-lib/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/elevanaltd/eav-shared-lib/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/elevanaltd/eav-shared-lib/releases/tag/v0.1.0
