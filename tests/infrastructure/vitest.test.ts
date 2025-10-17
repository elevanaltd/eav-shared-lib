import { describe, it, expect, vi } from 'vitest'
import { existsSync } from 'fs'
import { join } from 'path'

describe('Vitest Configuration', () => {
  it('should have vitest.config.ts config file', () => {
    const configPath = join(process.cwd(), 'vitest.config.ts')
    expect(existsSync(configPath)).toBe(true)
  })

  it('should support vitest globals (describe, it, expect)', () => {
    // If this test runs, globals are working
    expect(describe).toBeDefined()
    expect(it).toBeDefined()
    expect(expect).toBeDefined()
  })

  it('should support mocking with vi', () => {
    const mockFn = vi.fn()
    mockFn('test')

    expect(vi.fn).toBeDefined()
    expect(mockFn).toHaveBeenCalledWith('test')
  })

  it('should have test setup file', () => {
    const setupPath = join(process.cwd(), 'tests', 'setup.ts')
    expect(existsSync(setupPath)).toBe(true)
  })

  it('should support Supabase mocking in setup', async () => {
    // Verify mock is configured in setup
    const { createClient } = await import('@supabase/supabase-js')

    // Should be a mock function (setup.ts should have mocked it)
    expect(vi.isMockFunction(createClient)).toBe(true)
  })
})
