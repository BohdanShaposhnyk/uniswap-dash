import type { MidgardPool } from '@/lib/rest/public/thorchain/midgard/queries/pools/schema.response';

export function PoolRow({ pool }: { pool: MidgardPool }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3 px-2 rounded-md hover:bg-muted/50 transition-colors">
      <span className="text-sm font-medium">
        {pool.asset} <span className="text-muted-foreground font-normal">(on {pool.chain})</span>
      </span>
      <span className="text-muted-foreground text-sm mr-2">Price: {pool.assetPriceUSD}</span>
      <span className="text-muted-foreground text-sm">Volume 24h: {pool.volume24h}</span>
    </li>
  );
}
