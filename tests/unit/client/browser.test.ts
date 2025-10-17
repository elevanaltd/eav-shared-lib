import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createBrowserClient } from '../../../src/client/browser.js'

describe('createBrowserClient', () => {
  // Save original environment
  const originalEnv = { ...import.meta.env }

  beforeEach(() => {
    // Set default test environment
    import.meta.env.VITE_SUPABASE_URL = 'https://test.supabase.co'
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY = 'test-publishable-key'
  })

  afterEach(() => {
    // Restore original environment
    Object.assign(import.meta.env, originalEnv)
  })

  it('creates Supabase client with environment variables', () => {
    const client = createBrowserClient()

    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })

  it('throws if VITE_SUPABASE_URL missing', () => {
    delete import.meta.env.VITE_SUPABASE_URL

    expect(() => createBrowserClient()).toThrow('Missing VITE_SUPABASE_URL')
  })

  it('throws if VITE_SUPABASE_PUBLISHABLE_KEY missing', () => {
    delete import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    delete import.meta.env.VITE_SUPABASE_ANON_KEY

    expect(() => createBrowserClient()).toThrow(
      'Missing VITE_SUPABASE_PUBLISHABLE_KEY'
    )
  })

  it('falls back to VITE_SUPABASE_ANON_KEY for backward compatibility', () => {
    delete import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key'

    const client = createBrowserClient()

    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })
})
