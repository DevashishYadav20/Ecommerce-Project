// src/utils/asset.ts
export const asset = (p: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const rel = p.replace(/^\/+/, '');       // remove any leading slash
  return `${base}${rel}`.replace(/\/{2,}/g, '/');
};
