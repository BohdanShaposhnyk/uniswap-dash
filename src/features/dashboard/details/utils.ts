import { DepthsInterval } from '@/lib/rest/public/thorchain/midgard/queries/depths/schema.response';

export const parsePriceUSD = (value: string) => {
  const n = Number(value.replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

export const calculatePercentChange = (intervals: DepthsInterval[]) => {
  const firstPrice = intervals.length > 0 ? parsePriceUSD(intervals[0].assetPriceUSD) : 0;
  const lastPrice =
    intervals.length > 0 ? parsePriceUSD(intervals[intervals.length - 1].assetPriceUSD) : 0;
  const percentChange = firstPrice > 0 ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0;
  const isRise = percentChange > 0;
  const isDrop = percentChange < 0;
  return { percentChange, isRise, isDrop };
};
