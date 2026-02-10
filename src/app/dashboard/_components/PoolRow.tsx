import { Card, CardContent } from "@/components/ui/card";
import type { Pool } from "@/lib/validators/pool";

const tvlFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function PoolRow({ pool }: { pool: Pool }) {
  const tvl = parseFloat(pool.totalValueLockedUSD);
  const symbol = `${pool.token0.symbol} / ${pool.token1.symbol}`;
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <span className="font-medium">{symbol}</span>
        <span className="text-muted-foreground">
          {Number.isNaN(tvl) ? pool.totalValueLockedUSD : tvlFormatter.format(tvl)}
        </span>
      </CardContent>
    </Card>
  );
}
