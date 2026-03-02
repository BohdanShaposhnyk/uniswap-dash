import Link from 'next/link';
import type { MidgardPool } from '@/lib/rest/public/thorchain/midgard/queries/pools/schema.response';

type Props = {
  pool: MidgardPool;
  isSelected?: boolean;
};

export function PoolRow({ pool, isSelected }: Props) {
  return (
    <li>
      <Link
        href={`/dashboard/${pool.assetRaw}`}
        className={`flex items-center justify-between gap-4 py-3 px-2 rounded-md transition-colors hover:bg-muted/50 ${isSelected ? 'bg-muted' : ''
          }`}
      >
        <span className="text-sm font-medium">
          {pool.asset} <span className="text-muted-foreground font-normal">(on {pool.chain})</span>
        </span>
        <span className="text-muted-foreground text-sm mr-2">Price: {pool.assetPriceUSD}</span>
        <span className="text-muted-foreground text-sm">Volume 24h: {pool.volume24h}</span>
      </Link>
    </li>
  );
}
