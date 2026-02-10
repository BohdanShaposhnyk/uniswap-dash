import { getTopPools } from "@/lib/graphql/queries/getTopPools";
import { PoolList } from "./_components/PoolList";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const pools = await getTopPools(5);
  return (
    <main className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Top pools by TVL</h1>
      <PoolList pools={pools} />
    </main>
  );
}
