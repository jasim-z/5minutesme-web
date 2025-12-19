import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// These should be set as environment variables in production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a single supabase client for interacting with your database
// Note: In production, ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

