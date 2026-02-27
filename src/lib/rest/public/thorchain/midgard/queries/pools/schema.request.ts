import { z } from 'zod';

const ENDPOINT_NAME = 'pools';

const STATUS_VALUES = ['available', 'staged', 'suspended'] as const;
const PERIOD_VALUES = [
  '1h',
  '24h',
  '7d',
  '14d',
  '30d',
  '90d',
  '100d',
  '180d',
  '365d',
  'all',
] as const;

const SORT_BY_VALUES = ['asset', 'chain', 'volume24hRaw'] as const;
const SORT_DIR_VALUES = ['asc', 'desc'] as const;

const queryParamsNativeSchema = z.object({
  status: z.enum(STATUS_VALUES).optional(),
  period: z.enum(PERIOD_VALUES).optional(),
});

const transformSchema = z.object({
  sortBy: z.enum(SORT_BY_VALUES).optional(),
  sortDir: z.enum(SORT_DIR_VALUES).optional(),
});

const GetPoolsQueryParamsSchema = z.object({
  queryParams: queryParamsNativeSchema.optional(),
  transform: transformSchema.optional(),
});

type GetPoolsQueryParams = z.infer<typeof GetPoolsQueryParamsSchema>;

export { ENDPOINT_NAME, type GetPoolsQueryParams };
