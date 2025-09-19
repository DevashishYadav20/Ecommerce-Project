// src/utils/api.ts
import axios from 'axios';

const trim = (u?: string) => (u ? u.replace(/\/+$/, '') : '');
const API_ROOT = trim(import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE);

if (import.meta.env.DEV && !API_ROOT) {
  throw new Error('VITE_API_URL is missing. Set it in Netlify env or .env files.');
}

export const api = axios.create({
  baseURL: API_ROOT, // no fallback -> safer
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 10000,
});

if (import.meta.env.DEV) {
 
  console.log('API Base URL:', api.defaults.baseURL);
}
