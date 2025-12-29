"use client";

import { useEffect } from "react";
import { authService } from "../lib/authService";
import { clearAccessToken, getAccessToken, getPersistMode, setAccessToken } from "../lib/tokenStorage";

function decodeJwt(token: string): { exp?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export function useTokenRefresh() {
  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const payload = decodeJwt(token);
    if (!payload?.exp) return;

    const expiresAt = payload.exp * 1000;
    const now = Date.now();

    const refreshAt = expiresAt - 5 * 60 * 1000;
    const delay = Math.max(refreshAt - now, 0);

    const timeout = setTimeout(async () => {
      try {
        const response = await authService.refreshToken();
        if (response.success && response.data?.token) {
          setAccessToken(response.data.token, getPersistMode());
        } else {
          clearAccessToken();
          window.location.href = "/login";
        }
      } catch {
        clearAccessToken();
        window.location.href = "/login";
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, []);
}
