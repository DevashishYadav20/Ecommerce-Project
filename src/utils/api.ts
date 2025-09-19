// src/utils/api.ts
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

// Remove trailing slashes to avoid //api paths
const trim = (u?: string) => (u ? u.replace(/\/+$/, '') : '');

const API_ROOT = trim(
  import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE ?? ''
);

if (import.meta.env.DEV && !API_ROOT) {
  throw new Error('VITE_API_URL is missing. Set it in Netlify env or .env files.');
}

export const api = axios.create({
  baseURL: API_ROOT, // e.g. https://ecommerce-backend-sh3h.onrender.com
  timeout: 30000,    // survive Render cold starts
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: false,
});

// One-time retry on timeout without any/experimental types
type RetryableConfig = AxiosRequestConfig & { __retried?: boolean };

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const cfg = (error.config ?? undefined) as RetryableConfig | undefined;
    if (!cfg || cfg.__retried) throw error;

    const isTimeout =
      error.code === 'ECONNABORTED' ||
      (typeof error.message === 'string' &&
        error.message.toLowerCase().includes('timeout'));

    if (isTimeout) {
      cfg.__retried = true;
      return api.request(cfg);
    }

    throw error;
  }
);

if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log('API Base URL:', api.defaults.baseURL);
}
