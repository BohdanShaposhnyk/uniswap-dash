import { type DepthsInterval } from '@/lib/rest/public/thorchain/midgard/queries/depths/schema.response';
import { cn } from '@/lib/utils/styles';
import { calculatePercentChange } from './utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

type Props = {
  intervals: DepthsInterval[];
};

export function PriceChangeIndicator({ intervals }: Props) {
  const { percentChange, isRise, isDrop } = calculatePercentChange(intervals);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-sm font-medium',
        isRise && 'text-green-600 dark:text-green-500',
        isDrop && 'text-red-600 dark:text-red-500',
        !isRise && !isDrop && 'text-muted-foreground',
      )}
    >
      {isRise && <TrendingUp className="size-4" aria-hidden />}
      {isDrop && <TrendingDown className="size-4" aria-hidden />}
      {percentChange > 0 ? '+' : ''}
      {percentChange.toFixed(2)}%
    </span>
  );
}
