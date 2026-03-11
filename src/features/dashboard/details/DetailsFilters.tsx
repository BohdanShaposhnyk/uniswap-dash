'use client';

import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RANGE_VALUES, type RangePreset } from '@/lib/config/charts/midgardDepthXScale';

const RANGE_LABELS: Record<RangePreset, string> = {
  hour: 'Hour',
  day: 'Day',
  month: 'Month',
  year: 'Year',
};

type Props = {
  pool: string;
  range: RangePreset;
};

export function DetailsFilters({ pool, range }: Props) {
  const router = useRouter();

  const handleRangeChange = (value: string) => {
    router.replace(`/dashboard/${pool}?range=${value}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Select value={range} onValueChange={handleRangeChange}>
        <SelectTrigger id="details-range" className="min-w-[120px]">
          <SelectValue placeholder="Range" />
        </SelectTrigger>
        <SelectContent>
          {RANGE_VALUES.map((v) => (
            <SelectItem key={v} value={v}>
              {RANGE_LABELS[v]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
