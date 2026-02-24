import { gqlFetch } from '../client';
import type { Pool } from '@/lib/graphql/validators/pool';
import {
  TopPoolsByTvlDocument,
  type TopPoolsByTvlQuery,
  type TopPoolsByTvlQueryVariables,
} from '@/lib/graphql/generated';

export async function getTopPools(first: number): Promise<Pool[]> {
  const data = await gqlFetch<TopPoolsByTvlQuery, TopPoolsByTvlQueryVariables>(
    TopPoolsByTvlDocument,
    { first },
  );
  return data.pools;
}
