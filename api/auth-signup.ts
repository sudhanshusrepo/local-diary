import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getServiceClient } from './_supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const { email, password, metadata } = body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: metadata || {}
    });
    if (error) return res.status(400).json({ error: error.message });

    // Optionally create profile row
    const profile = {
      id: data.user?.id,
      name: metadata?.name || null,
      avatar_url: metadata?.avatar_url || null
    };
    if (profile.id) {
      await supabase.from('profiles').insert({ id: profile.id, name: profile.name, avatar_url: profile.avatar_url }).maybeSingle();
    }

    return res.status(201).json({ user: data.user });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Internal error' });
  }
}

function safeParse(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
