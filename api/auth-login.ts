import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireEnv } from './_supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const { email, password } = body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const url = requireEnv('SUPABASE_URL');
    const anon = requireEnv('SUPABASE_ANON_KEY');
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ access_token: data.session?.access_token, user: data.user });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Internal error' });
  }
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
