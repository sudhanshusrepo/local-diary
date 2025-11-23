import type { SupabaseClient } from '@supabase/supabase-js';

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function supabaseRequire() {
  // Use CommonJS require to avoid ESM issues on Vercel Node runtime
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('@supabase/supabase-js');
}

export async function getServiceClient(): Promise<SupabaseClient> {
  const url = requireEnv('SUPABASE_URL');
  const key = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  const { createClient } = supabaseRequire();
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function getClientForToken(accessToken: string): Promise<SupabaseClient> {
  const url = requireEnv('SUPABASE_URL');
  const anon = requireEnv('SUPABASE_ANON_KEY');
  const { createClient } = supabaseRequire();
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } }
  });
}

export function extractBearerToken(authHeader?: string): string | null {
  if (!authHeader) return null;
  const [type, token] = authHeader.split(' ');
  if (type?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}
