import { AreaChart } from '@/components/charts/area/area-chart';
import { type RangePreset, X_AXIS_TICK_CONFIG } from '@/lib/config/charts/midgardDepthXScale';
import type { DepthsInterval } from '@/lib/rest/public/thorchain/midgard/queries/depths/schema.response';
import { formatCurrency } from '@/lib/utils/formatting';
import { parsePriceUSD } from './utils';

type Props = {
  intervals: DepthsInterval[];
  range: RangePreset;
};

export function AssetPriceChart({ intervals, range }: Props) {
  if (intervals.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-md border border-border text-muted-foreground text-sm">
        No interval data for this range
      </div>
    );
  }

  const data = intervals.map((i) => ({
    date: i.endTime instanceof Date ? i.endTime : new Date(i.endTime),
    value: parsePriceUSD(i.assetPriceUSD),
  }));

  const yDomainMax = data.length ? Math.max(...data.map((d) => d.value)) : 0;
  const formatY = (v: number) =>
    formatCurrency(v, {
      maximumFractionDigits: yDomainMax < 1 ? 4 : yDomainMax < 100 ? 2 : 0,
      minimumFractionDigits: 0,
    });

  return (
    <div className="w-full pr-10">
      <AreaChart data={data} formatY={formatY} xAxis={X_AXIS_TICK_CONFIG[range]} />
    </div>
  );
}
