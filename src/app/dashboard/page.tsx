import { getPools } from '@/lib/rest/public/thorchain/midgard/queries/pools';
import { PoolList } from './_components/PoolList';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const pools = await getPools({
    queryParams: {
      status: 'available',
    },
    transform: {
      sortBy: 'volume24hRaw',
      sortDir: 'desc',
    },
  });
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-6">Thorchain pools</h1>
          <PoolList pools={pools} />
        </div>
        <div className="min-h-[200px] grid grid-rows-2 gap-6">

        </div>
      </div>
    </main>
  );
}
