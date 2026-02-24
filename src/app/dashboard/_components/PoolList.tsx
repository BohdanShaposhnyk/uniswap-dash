import { Grid } from '@/components/ui/grid';
import type { MidgardPool } from '@/lib/rest/public/thorchain/midgard/queries/pools/schema';
import { PoolCard } from './PoolCard';

export function PoolList({ pools }: { pools: MidgardPool[] }) {
  if (pools.length === 0) {
    return <p className="text-muted-foreground py-8 text-center">No pools</p>;
  }
  return (
    <Grid>
      {pools.map((pool) => (
        <PoolCard key={`${pool.asset}-${pool.chain}`} pool={pool} />
      ))}
    </Grid>
  );
}
