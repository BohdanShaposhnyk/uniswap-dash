import { getDepths } from '@/lib/rest/public/thorchain/midgard/queries/depths/index';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatTimestamp } from '@/lib/utils/formatting';

type Props = {
  params: Promise<{ pool: string }>;
};

export default async function DashboardDetails({ params }: Props) {
  const { pool } = await params;

  const data = await getDepths(pool, {
    queryParams: { interval: 'day', count: '30' },
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold">Pool details — {pool}</h2>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {data.meta && (
          <div className="grid grid-cols-2 gap-2">
            <div>Start time</div>
            <div className="text-muted-foreground">{formatTimestamp(data.meta.startTime)}</div>
            <div>End time</div>
            <div className="text-muted-foreground">{formatTimestamp(data.meta.endTime)}</div>
            <div>Start asset depth</div>
            <div className="text-muted-foreground">{data.meta.startAssetDepth}</div>
            <div>End asset depth</div>
            <div className="text-muted-foreground">{data.meta.endAssetDepth}</div>
            <div>Start rune depth</div>
            <div className="text-muted-foreground">{data.meta.startRuneDepth}</div>
            <div>End rune depth</div>
            <div className="text-muted-foreground">{data.meta.endRuneDepth}</div>
          </div>
        )}
        {data.intervals && data.intervals.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Recent intervals ({data.intervals.length})</h3>
            <div className="overflow-x-auto max-h-48 overflow-y-auto rounded border border-border">
              <table className="w-full text-xs">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="text-left p-2">End time</th>
                    <th className="text-right p-2">Asset depth</th>
                    <th className="text-right p-2">Rune depth</th>
                    <th className="text-right p-2">Price USD</th>
                  </tr>
                </thead>
                <tbody>
                  {data.intervals.slice(-10).reverse().map((interval, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-2">{formatTimestamp(interval.endTime)}</td>
                      <td className="p-2 text-right">{interval.assetDepth}</td>
                      <td className="p-2 text-right">{interval.runeDepth}</td>
                      <td className="p-2 text-right">{interval.assetPriceUSD}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
