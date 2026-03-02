/**
 * Backend API base URL. Set NEXT_PUBLIC_API_URL in .env.
 * - Production (HTTPS): use same protocol as the site, e.g. https://203.190.9.174:2021/api
 * - Same-origin (reverse proxy): leave unset to use relative /api
 * - Local: defaults to http://localhost:2021/api
 */
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL !== undefined &&
  process.env.NEXT_PUBLIC_API_URL !== ''
    ? process.env.NEXT_PUBLIC_API_URL
    : typeof window !== 'undefined'
      ? '/api'
      : 'http://203.190.9.174:3011/api';

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}
