import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for browser-based interactions.
 * This client is used for client components and other frontend logic.
 */
export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
} 