import type { VercelRequest, VercelResponse } from '@vercel/node';
import { extractBearerToken, getClientForToken } from './_supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  const token = extractBearerToken(req.headers.authorization);
  if (!token) return res.status(401).json({ error: 'Missing bearer token' });
  const supabase = getClientForToken(token);

  if (req.method === 'GET') {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return res.status(401).json({ error: 'Invalid session' });
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ profile: data });
  }

  if (req.method === 'PUT') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return res.status(401).json({ error: 'Invalid session' });
    const update = { name: body?.name ?? null, avatar_url: body?.avatar_url ?? null, bio: body?.bio ?? null };
    const { data, error } = await supabase.from('profiles').upsert({ id: user.id, ...update }).select('*').maybeSingle();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ profile: data });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
