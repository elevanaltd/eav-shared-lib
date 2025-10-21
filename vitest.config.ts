import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'], // Support co-located tests

    // Vitest 3.x changes:
    // - Default pool changed from 'threads' to 'forks' (more stable concurrency)
    // - Hooks now execute in stack order (after* reversed)
    // - suite.concurrent runs all tests concurrently (tighter assumptions)
    // pool: 'forks' is now default, explicitly set only if overriding

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'tests/', '**/*.test.ts', '**/*.test.tsx'],
      // Vitest 3.x: V8 coverage ignores empty lines by default (affects thresholds)
    },
  },
})
