import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createBrowserClient } from '../../src/client/browser.js'

describe('createBrowserClient', () => {
  // Save original environment
  const originalEnv = { ...import.meta.env }

  beforeEach(() => {
    // Reset environment before each test
    vi.stubGlobal('import.meta', {
      env: {
        ...originalEnv,
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_PUBLISHABLE_KEY: 'test-publishable-key',
      },
    })
  })

  it('creates Supabase client with environment variables', () => {
    const client = createBrowserClient()

    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })

  it('throws if VITE_SUPABASE_URL missing', () => {
    vi.stubGlobal('import.meta', {
      env: {
        ...originalEnv,
        VITE_SUPABASE_URL: undefined,
        VITE_SUPABASE_PUBLISHABLE_KEY: 'test-publishable-key',
      },
    })

    expect(() => createBrowserClient()).toThrow('Missing VITE_SUPABASE_URL')
  })

  it('throws if VITE_SUPABASE_PUBLISHABLE_KEY missing', () => {
    vi.stubGlobal('import.meta', {
      env: {
        ...originalEnv,
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_PUBLISHABLE_KEY: undefined,
        VITE_SUPABASE_ANON_KEY: undefined,
      },
    })

    expect(() => createBrowserClient()).toThrow(
      'Missing VITE_SUPABASE_PUBLISHABLE_KEY'
    )
  })

  it('falls back to VITE_SUPABASE_ANON_KEY for backward compatibility', () => {
    vi.stubGlobal('import.meta', {
      env: {
        ...originalEnv,
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_PUBLISHABLE_KEY: undefined,
        VITE_SUPABASE_ANON_KEY: 'test-anon-key',
      },
    })

    const client = createBrowserClient()

    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })
})
