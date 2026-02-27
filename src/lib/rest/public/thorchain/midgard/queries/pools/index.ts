import { sortBy } from '@/lib/utils/arrays';
import { get } from '../../client';
import { PoolsResponseSchema, type MidgradPoolRaw, type MidgardPool } from './schema.response';
import { ENDPOINT_NAME, type GetPoolsQueryParams } from './schema.request';

export async function getPools(params?: GetPoolsQueryParams): Promise<MidgardPool[]> {
  const raw = await get<MidgradPoolRaw[]>(ENDPOINT_NAME, params?.queryParams);

  const pools = PoolsResponseSchema.parse(raw);

  if (params?.transform && params.transform.sortBy && params.transform.sortDir) {
    return sortBy<MidgardPool>(params.transform.sortBy, params.transform.sortDir)(pools);
  }
  return pools;
}
