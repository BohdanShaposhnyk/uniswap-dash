import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { MidgardPool } from '@/lib/rest/public/thorchain/midgard/queries/pools/schema';

export function PoolCard({ pool }: { pool: MidgardPool }) {
  return (
    <Card className="flex flex-col gap-4 py-4 aspect-square min-h-0">
      <CardHeader className="px-4 pb-0">
        <CardTitle className="text-base leading-tight">
          {pool.asset} (on {pool.chain})
        </CardTitle>
      </CardHeader>
      <CardDescription className="px-4">
        <span className="text-muted-foreground text-sm mr-2">Price:</span>
        <span className="text-foreground text-sm">{pool.assetPriceUSD}</span>
      </CardDescription>
      <CardContent className="px-4">
        <div className="text-muted-foreground text-sm">Volume 24h:</div>
        <div className="text-foreground text-sm">{pool.volume24h}</div>
      </CardContent>
    </Card>
  );
}
