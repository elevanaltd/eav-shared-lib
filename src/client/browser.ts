import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/index.js'

/**
 * Creates browser-safe Supabase client using publishable key (RLS-enforced)
 *
 * Environment Variables Required:
 * - VITE_SUPABASE_URL: Supabase project URL
 * - VITE_SUPABASE_PUBLISHABLE_KEY: Client-side publishable key (or VITE_SUPABASE_ANON_KEY for backward compatibility)
 *
 * Security: Uses publishable key only (RLS policies enforced, per-user access)
 *
 * @returns Configured Supabase client
 * @throws Error if required environment variables missing
 *
 * @example
 * ```typescript
 * const supabase = createBrowserClient()
 * const { data } = await supabase.from('scripts').select('*')
 * ```
 */
export function createBrowserClient(): SupabaseClient<Database> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY // Backward compat

  if (!supabaseUrl) {
    throw new Error('Missing VITE_SUPABASE_URL environment variable')
  }

  if (!supabaseKey) {
    throw new Error('Missing VITE_SUPABASE_PUBLISHABLE_KEY environment variable')
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}
