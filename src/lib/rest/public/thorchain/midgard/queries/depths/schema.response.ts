import { z } from 'zod';
import { TimestampSchema } from '@/lib/schemas';

const DepthsMetaSchema = z.object({
  startTime: TimestampSchema,
  endTime: TimestampSchema,
  priceShiftLoss: z.string(),
  luviIncrease: z.string(),
  startAssetDepth: z.string(),
  startRuneDepth: z.string(),
  startLPUnits: z.string(),
  startMemberCount: z.string(),
  startSynthUnits: z.string(),
  endAssetDepth: z.string(),
  endRuneDepth: z.string(),
  endLPUnits: z.string(),
  endMemberCount: z.string(),
  endSynthUnits: z.string(),
});

const DepthsIntervalSchema = z.object({
  startTime: TimestampSchema,
  endTime: TimestampSchema,
  assetDepth: z.string(),
  runeDepth: z.string(),
  assetPrice: z.string(),
  assetPriceUSD: z.string(),
  openPriceUSD: z.string(),
  highPriceUSD: z.string(),
  lowPriceUSD: z.string(),
  closePriceUSD: z.string(),
  liquidityUnits: z.string(),
  membersCount: z.string(),
  synthUnits: z.string(),
  synthSupply: z.string(),
  units: z.string(),
  luvi: z.string(),
});

const DepthsResponseSchema = z.object({
  meta: DepthsMetaSchema,
  intervals: z.array(DepthsIntervalSchema),
});

export type DepthsMeta = z.infer<typeof DepthsMetaSchema>;
export type DepthsInterval = z.infer<typeof DepthsIntervalSchema>;
export type DepthsResponse = z.infer<typeof DepthsResponseSchema>;

export { DepthsMetaSchema, DepthsIntervalSchema, DepthsResponseSchema };
