/**
 * @eav-ops/shared-lib - Main entry point
 * Phase 1: Infrastructure setup complete
 *
 * Re-exports all modules for easy consumption:
 * - client: Supabase client factory
 * - types: Database and API types
 * - auth: Authentication utilities
 * - rls: Row Level Security utilities
 */

// Client module - Supabase client factory
export * from './client/index.js'

// Types module - Database and API types
export * from './types/index.js'

// Auth module - Authentication utilities
export * from './auth/index.js'

// RLS module - Row Level Security utilities
export * from './rls/index.js'
