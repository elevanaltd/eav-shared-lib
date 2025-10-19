import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createBrowserClient } from './browser.js'

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

  describe('Environment Fallback (Existing Behavior)', () => {
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

      expect(() => createBrowserClient()).toThrow('Missing VITE_SUPABASE_PUBLISHABLE_KEY')
    })

    it('falls back to VITE_SUPABASE_ANON_KEY for backward compatibility', () => {
      delete import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key'

      const client = createBrowserClient()

      expect(client).toBeDefined()
      expect(client.auth).toBeDefined()
    })
  })

  describe('Parameter Override (Dependency Injection) - RED PHASE', () => {
    it('should accept url and key parameters (TEST WILL FAIL - not implemented yet)', () => {
      // RED: This will fail because createBrowserClient doesn't accept parameters yet
      const client = createBrowserClient(
        'https://test-project.supabase.co',
        'test-anon-key'
      )

      expect(client).toBeDefined()
      expect(client.supabaseUrl).toBe('https://test-project.supabase.co')
      expect(client.supabaseKey).toBe('test-anon-key')
    })

    it('should prioritize provided parameters over environment variables', () => {
      // RED: Will fail - createBrowserClient doesn't accept parameters yet
      const client = createBrowserClient(
        'https://override-project.supabase.co',
        'override-anon-key'
      )

      expect(client).toBeDefined()
      expect(client.supabaseUrl).toBe('https://override-project.supabase.co')
      expect(client.supabaseKey).toBe('override-anon-key')
    })

    it('should throw error when only URL parameter provided without key', () => {
      // RED: Will fail - createBrowserClient doesn't accept parameters yet
      delete import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      delete import.meta.env.VITE_SUPABASE_ANON_KEY

      expect(() => createBrowserClient('https://test-project.supabase.co')).toThrow(
        'Missing VITE_SUPABASE_PUBLISHABLE_KEY'
      )
    })

    it('should throw error when only key parameter provided without URL', () => {
      // RED: Will fail - createBrowserClient doesn't accept parameters yet
      delete import.meta.env.VITE_SUPABASE_URL

      expect(() => createBrowserClient(undefined, 'test-anon-key')).toThrow(
        'Missing VITE_SUPABASE_URL'
      )
    })
  })
})
