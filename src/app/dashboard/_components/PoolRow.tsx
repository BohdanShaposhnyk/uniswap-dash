import { Card, CardContent } from "@/components/ui/card";
import type { MidgardPool } from "@/lib/rest/public/thorchain/midgard/queries/pools/schema";

export function PoolRow({ pool }: { pool: MidgardPool }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <span className="font-medium">
          {pool.asset} (on {pool.chain})
        </span>
        <span className="text-muted-foreground">{pool.assetPriceUSD}</span>
      </CardContent>
    </Card>
  );
}
