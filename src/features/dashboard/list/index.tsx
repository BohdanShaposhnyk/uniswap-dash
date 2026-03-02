import { getPools } from '@/lib/rest/public/thorchain/midgard/queries/pools';
import { PoolList } from './components/PoolList';

export default async function DashboardPoolList() {
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
    <>
      <h1 className="text-2xl font-semibold mb-6">Thorchain pools</h1>
      <PoolList pools={pools} />
    </>
  );
}
