import { z } from 'zod';

const INTERVAL_VALUES = ['5min', 'hour', 'day', 'week', 'month', 'quarter', 'year'] as const;

const queryParamsSchema = z.object({
  interval: z.enum(INTERVAL_VALUES).optional(),
  count: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === undefined ? undefined : String(v))),
  to: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === undefined ? undefined : String(v))),
  from: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === undefined ? undefined : String(v))),
});

export type GetDepthsQueryParams = z.infer<typeof queryParamsSchema>;

export function getDepthsPath(pool: string): string {
  return `history/depths/${pool}`;
}

export { queryParamsSchema };
