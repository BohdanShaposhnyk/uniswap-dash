import { sortBy } from '@/lib/utils/arrays';
import { get } from '../../client';
import {
  PoolsResponseSchema,
  type MidgradPoolRaw,
  type MidgardPool,
  type GetPoolsQueryParams,
} from './schema';

export async function getPools(params?: GetPoolsQueryParams): Promise<MidgardPool[]> {
  const raw = await get<MidgradPoolRaw[]>('pools', params?.apiParams);

  const pools = PoolsResponseSchema.parse(raw);

  if (params?.transform && params.transform.sortBy && params.transform.sortDir) {
    return sortBy<MidgardPool>(params.transform.sortBy, params.transform.sortDir)(pools);
  }
  return pools;
}
