import { VercelRequest, VercelResponse } from '@vercel/node';
const { extractBearerToken, getClientForToken } = require('./_supabase');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  const token = extractBearerToken(req.headers.authorization);
  if (!token) return res.status(401).json({ error: 'Missing bearer token' });
  const supabase = await getClientForToken(token);

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { recipient_id, content } = body || {};
    if (!recipient_id || !content) return res.status(400).json({ error: 'recipient_id and content required' });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return res.status(401).json({ error: 'Invalid session' });

    const { data, error } = await supabase.from('messages').insert({ sender_id: user.id, recipient_id, content }).select('*').maybeSingle();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ message: data });
  }

  if (req.method === 'GET') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return res.status(401).json({ error: 'Invalid session' });

    const { peer_id, limit = 50 } = req.query as Record<string, string>;
    if (peer_id) {
      // Thread between current user and peer
      const { data, error } = await supabase
        .from('messages_view')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${peer_id}),and(sender_id.eq.${peer_id},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true })
        .limit(Number(limit));
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json({ messages: data });
    }

    // Conversations list: latest message per peer
    const { data, error } = await supabase.rpc('get_conversations', { p_user_id: user.id });
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ conversations: data });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
