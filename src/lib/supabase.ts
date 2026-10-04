import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '⚠️ [VICTORY.AI] Supabase credentials are not fully configured. Please check your .env file.'
  );
}

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Health check helper to test active connection to Supabase
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  url: string;
}> {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return {
        connected: false,
        message: 'Missing VITE_SUPABASE_URL or Supabase Key in environment.',
        url: supabaseUrl || 'undefined',
      };
    }

    // Ping Supabase Auth to verify endpoint & credentials validity
    const { error } = await supabase.auth.getSession();
    if (error) {
      return {
        connected: false,
        message: error.message,
        url: supabaseUrl,
      };
    }

    return {
      connected: true,
      message: 'Successfully connected to Supabase!',
      url: supabaseUrl,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      message: errorMsg,
      url: supabaseUrl,
    };
  }
}
