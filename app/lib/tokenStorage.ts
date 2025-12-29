"use client";

export type TokenPersistMode = 'local' | 'session';

const ACCESS_TOKEN_KEY = 'accessToken';
const ACCESS_TOKEN_COOKIE = 'accessToken';

function decodeJwtExp(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (typeof payload.exp !== 'number') return null;
    return payload.exp;
  } catch {
    return null;
  }
}

function setCookie(name: string, value: string, options: { maxAgeSeconds?: number; path?: string } = {}) {
  if (typeof document === 'undefined') return;
  const path = options.path ?? '/';
  const maxAge = options.maxAgeSeconds !== undefined ? `; max-age=${options.maxAgeSeconds}` : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=${path}; samesite=lax${maxAge}`;
}

function clearCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;

  const local = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (local) return local;

  const session = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if (session) return session;

  const cookieMatch = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ACCESS_TOKEN_COOKIE}=`));

  if (cookieMatch) {
    const token = decodeURIComponent(cookieMatch.split('=')[1] || '');
    if (token) {
      // hydrate session storage as a fallback
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
      return token;
    }
  }

  return null;
}

export function setAccessToken(token: string, mode: TokenPersistMode = 'local') {
  if (typeof window === 'undefined') return;

  if (mode === 'local') {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  const exp = decodeJwtExp(token);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const maxAgeSeconds = exp ? Math.max(exp - nowSeconds, 0) : undefined;

  setCookie(ACCESS_TOKEN_COOKIE, token, {
    maxAgeSeconds: mode === 'local' ? maxAgeSeconds : undefined,
  });
}

export function clearAccessToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  clearCookie(ACCESS_TOKEN_COOKIE);
}

export function getPersistMode(): TokenPersistMode {
  if (typeof window === 'undefined') return 'local';
  return localStorage.getItem(ACCESS_TOKEN_KEY) ? 'local' : 'session';
}
