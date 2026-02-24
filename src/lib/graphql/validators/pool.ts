import { z } from 'zod';

const TokenSchema = z.object({
  symbol: z.string(),
});

const PoolSchema = z.object({
  id: z.string(),
  totalValueLockedUSD: z.string(),
  token0: TokenSchema,
  token1: TokenSchema,
});

const TopPoolsResponseSchema = z.object({
  data: z.object({
    pools: z.array(PoolSchema),
  }),
});

export type Pool = z.infer<typeof PoolSchema>;
export type Token = z.infer<typeof TokenSchema>;

export function parseTopPoolsResponse(json: unknown): Pool[] {
  const parsed = TopPoolsResponseSchema.parse(json);
  return parsed.data.pools;
}

export { PoolSchema, TokenSchema, TopPoolsResponseSchema };
