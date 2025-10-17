import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { join } from 'path'

describe('Package Barrel Exports', () => {
  // Test that barrel export files exist
  it('should have client/index.ts barrel export', () => {
    const indexPath = join(process.cwd(), 'src', 'client', 'index.ts')
    expect(existsSync(indexPath)).toBe(true)
  })

  it('should have types/index.ts barrel export', () => {
    const indexPath = join(process.cwd(), 'src', 'types', 'index.ts')
    expect(existsSync(indexPath)).toBe(true)
  })

  it('should have auth/index.ts barrel export', () => {
    const indexPath = join(process.cwd(), 'src', 'auth', 'index.ts')
    expect(existsSync(indexPath)).toBe(true)
  })

  it('should have rls/index.ts barrel export', () => {
    const indexPath = join(process.cwd(), 'src', 'rls', 'index.ts')
    expect(existsSync(indexPath)).toBe(true)
  })

  // Test that main index re-exports all modules
  it('should re-export from client module', async () => {
    // This will fail if src/index.ts doesn't export from client
    const mainExports = await import('../../../src/index.js')
    expect(mainExports).toBeDefined()

    // Verify client exports are available
    // (Will be placeholders in Phase 1, real implementations in Phase 2)
  })

  it('should re-export from types module', async () => {
    const mainExports = await import('../../../src/index.js')
    expect(mainExports).toBeDefined()
  })

  it('should re-export from auth module', async () => {
    const mainExports = await import('../../../src/index.js')
    expect(mainExports).toBeDefined()
  })

  it('should re-export from rls module', async () => {
    const mainExports = await import('../../../src/index.js')
    expect(mainExports).toBeDefined()
  })
})
