import { z } from "zod";
import { parseMidgradAssetName } from "@/lib/utils/parseMidgradAssetName";

const MidgardPoolSchemaRaw = z.object({
  asset: z.string(),
  assetDepth: z.string(),
  runeDepth: z.string(),
  assetPrice: z.string().optional(),
  assetPriceUSD: z.string(),
  status: z.string(),
  volume24h: z.string().optional(),
  poolAPY: z.string().optional(),
  liquidityUnits: z.string().optional(),
  synthSupply: z.string().optional(),
  units: z.string().optional(),
});

const MidgardPoolSchema = MidgardPoolSchemaRaw.transform((pool) => {
  const { asset, chain } = parseMidgradAssetName(pool.asset);
  return {
    ...pool,
    asset,
    chain,
    assetRaw: pool.asset,
  };
});

const PoolsResponseSchema = z.array(MidgardPoolSchema);

type MidgardPool = z.infer<typeof MidgardPoolSchema>;

export { MidgardPoolSchema, PoolsResponseSchema, type MidgardPool };
