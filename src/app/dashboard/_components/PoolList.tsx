import type { MidgardPool } from "@/lib/rest/public/thorchain/midgard/queries/pools/schema";
import { PoolRow } from "./PoolRow";

export function PoolList({ pools }: { pools: MidgardPool[] }) {
  if (pools.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No pools</p>;
  }
  return (
    <ul className="flex flex-col gap-3 list-none p-0 m-0">
      {pools.map((pool) => (
        <li key={`${pool.asset}-${pool.chain}`}>
          <PoolRow pool={pool} />
        </li>
      ))}
    </ul>
  );
}
