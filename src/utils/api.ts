import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // Comes from .env files
});
