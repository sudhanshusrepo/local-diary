export type ApiError = { error: string };

const TOKEN_KEY = 'ld_token';

export function saveToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch {}
}
export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
export function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch {}
}

export async function fetchJSON<T>(input: RequestInfo, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers as HeadersInit);
  if (!headers.has('Content-Type') && init.body) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(input, { ...init, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || res.statusText;
    throw new Error(msg);
  }
  return data as T;
}
