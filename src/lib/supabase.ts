import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL from environment variables, or use the provided project URL as a fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hxqfqffphobxmtkjtbdl.supabase.co';

// Get the Supabase Anon Key from environment variables
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.warn(
    'Missing VITE_SUPABASE_ANON_KEY environment variable. ' +
    'Please add it to your environment variables to connect to your Supabase project.'
  );
}

// Initialize the Supabase client
// We use a fallback key to prevent the app from crashing during development if the key is missing
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder-anon-key-prevent-crash'
);
