import { get } from '../../client';
import { DepthsResponseSchema, type DepthsResponse } from './schema.response';
import { getDepthsPath, type GetDepthsQueryParams } from './schema.request';

export async function getDepths(
  pool: string,
  params?: { queryParams?: GetDepthsQueryParams },
): Promise<DepthsResponse> {
  const path = getDepthsPath(pool);

  const raw = await get<DepthsResponse>(path, params?.queryParams);
  return DepthsResponseSchema.parse(raw);
}
