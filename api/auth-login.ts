import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getClientForToken, requireEnv } from './_supabase';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const url = requireEnv('SUPABASE_URL');
    const anon = requireEnv('SUPABASE_ANON_KEY');
    const supabase = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ access_token: data.session?.access_token, user: data.user });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Internal error' });
  }
}
