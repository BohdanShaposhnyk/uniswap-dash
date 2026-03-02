import { z } from 'zod';
import { TimestampSchema } from '@/lib/schemas';

const DepthsMetaSchema = z.object({
  startTime: TimestampSchema,
  endTime: TimestampSchema,
  priceShiftLoss: z.string().optional(),
  luviIncrease: z.string().optional(),
  startAssetDepth: z.string(),
  startRuneDepth: z.string(),
  startLPUnits: z.string().optional(),
  startMemberCount: z.string().optional(),
  startSynthUnits: z.string().optional(),
  endAssetDepth: z.string(),
  endRuneDepth: z.string(),
  endLPUnits: z.string().optional(),
  endMemberCount: z.string().optional(),
  endSynthUnits: z.string().optional(),
});

const DepthsIntervalSchema = z.object({
  startTime: TimestampSchema,
  endTime: TimestampSchema,
  assetDepth: z.string(),
  runeDepth: z.string(),
  assetPrice: z.string(),
  assetPriceUSD: z.string(),
  openPriceUSD: z.string().optional(),
  highPriceUSD: z.string().optional(),
  lowPriceUSD: z.string().optional(),
  closePriceUSD: z.string().optional(),
  liquidityUnits: z.string().optional(),
  membersCount: z.string().optional(),
  synthUnits: z.string().optional(),
  synthSupply: z.string().optional(),
  units: z.string().optional(),
  luvi: z.string().optional(),
});

const DepthsResponseSchema = z.object({
  meta: DepthsMetaSchema.optional(),
  intervals: z.array(DepthsIntervalSchema).optional(),
});

export type DepthsMeta = z.infer<typeof DepthsMetaSchema>;
export type DepthsInterval = z.infer<typeof DepthsIntervalSchema>;
export type DepthsResponse = z.infer<typeof DepthsResponseSchema>;

export { DepthsMetaSchema, DepthsIntervalSchema, DepthsResponseSchema };
