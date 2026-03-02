import { z } from 'zod';

export const TimestampSchema = z.union([z.string(), z.number()]).transform((v) => {
  if (typeof v === 'string') {
    // ISO
    if (v.includes('T')) return new Date(v);

    // numeric string
    const n = Number(v);
    return new Date(n > 1e12 ? n : n * 1000);
  }

  return new Date(v > 1e12 ? v : v * 1000);
});
