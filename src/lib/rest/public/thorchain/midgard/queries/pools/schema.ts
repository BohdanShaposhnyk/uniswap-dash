import { z } from 'zod';
import { parseMidgradAssetName } from '@/lib/utils/parseMidgradAssetName';
import { formatCurrency } from '@/lib/utils/formatting';

const E8 = 1e8;

const MidgardPoolSchemaRaw = z.object({
  asset: z.string(),
  assetDepth: z.string(),
  runeDepth: z.string(),
  assetPrice: z.coerce.number(),
  assetPriceUSD: z.coerce.number(),
  status: z.string(),
  volume24h: z.coerce.number(),
  poolAPY: z.string().optional(),
  liquidityUnits: z.string().optional(),
  synthSupply: z.string().optional(),
  units: z.string().optional(),
});

type MidgradPoolRaw = z.infer<typeof MidgardPoolSchemaRaw>;

const MidgardPoolSchema = MidgardPoolSchemaRaw.transform((pool) => {
  const { asset, chain } = parseMidgradAssetName(pool.asset);
  const volume24h = formatCurrency(pool.volume24h / E8, {
    maximumFractionDigits: 0,
    notation: 'compact',
  });
  const assetPriceUSD = formatCurrency(pool.assetPriceUSD, {
    maximumFractionDigits: 2,
  });

  return {
    ...pool,
    asset,
    chain,
    assetRaw: pool.asset,
    volume24h,
    volume24hRaw: pool.volume24h,
    assetPriceUSD,
  };
});

const PoolsResponseSchema = z.array(MidgardPoolSchema);

type MidgardPool = z.infer<typeof MidgardPoolSchema>;

const GetPoolsQueryParamsSchema = z.object({
  apiParams: z
    .object({
      status: z.string().optional(),
      period: z.string().optional(),
    })
    .optional(),
  transform: z
    .object({
      sortBy: z.enum(['asset', 'chain', 'volume24hRaw']).optional(),
      sortDir: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
});

type GetPoolsQueryParams = z.infer<typeof GetPoolsQueryParamsSchema>;

export {
  MidgardPoolSchema,
  PoolsResponseSchema,
  type MidgardPool,
  type MidgradPoolRaw,
  type GetPoolsQueryParams,
};
