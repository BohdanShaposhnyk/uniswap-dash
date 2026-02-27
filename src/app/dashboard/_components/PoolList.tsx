import type { MidgardPool } from '@/lib/rest/public/thorchain/midgard/queries/pools/schema.response';
import { PoolRow } from './PoolRow';

export function PoolList({ pools }: { pools: MidgardPool[] }) {
  if (pools.length === 0) {
    return <p className="text-muted-foreground py-8 text-center">No pools</p>;
  }
  return (
    <ul className="divide-y divide-border rounded-md border border-border">
      {pools.map((pool) => (
        <PoolRow key={`${pool.asset}-${pool.chain}`} pool={pool} />
      ))}
    </ul>
  );
}
