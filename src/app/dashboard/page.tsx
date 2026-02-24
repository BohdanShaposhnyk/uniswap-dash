import { getPools } from '@/lib/rest/public/thorchain/midgard/queries/pools';
import { PoolList } from './_components/PoolList';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const pools = await getPools({
    transform: {
      sortBy: 'volume24hRaw',
      sortDir: 'desc',
    },
  });
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Thorchain pools</h1>
      <PoolList pools={pools} />
    </main>
  );
}
