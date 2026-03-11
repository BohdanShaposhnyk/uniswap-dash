import type { Interval } from '@/lib/rest/public/thorchain/midgard/queries/depths/schema.request';

const RANGE_VALUES = ['hour', 'day', 'month', 'year'] as const;
export type RangePreset = (typeof RANGE_VALUES)[number];

const PRESETS: Record<RangePreset, { interval: Interval; count: number }> = {
  hour: { interval: '5min', count: 12 },
  day: { interval: 'hour', count: 24 },
  month: { interval: 'day', count: 30 },
  year: { interval: 'week', count: 55 },
};

const DEFAULT_RANGE: RangePreset = 'day';

function toSingle(value: string | string[] | undefined): string | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export type DepthsSearchParams = {
  range: RangePreset;
  interval: string;
  count: number;
};

export function parseDepthsSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): DepthsSearchParams {
  const raw = toSingle(searchParams.range);
  const range: RangePreset =
    raw && RANGE_VALUES.includes(raw as RangePreset) ? (raw as RangePreset) : DEFAULT_RANGE;
  const { interval, count } = PRESETS[range];
  return { range, interval, count };
}

export { RANGE_VALUES, PRESETS };

export const X_AXIS_TICK_CONFIG: Record<
  RangePreset,
  { tickCount: number; format: (d: Date) => string }
> = {
  hour: {
    tickCount: 4,
    format: (d) =>
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  },
  day: {
    tickCount: 6,
    format: (d) => d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
  },
  month: {
    tickCount: 6,
    format: (d) => d.toLocaleDateString('en-US', { month: 'numeric', day: '2-digit' }),
  },
  year: {
    tickCount: 12,
    format: (d) => d.toLocaleDateString('en-US', { month: 'short' }),
  },
};
