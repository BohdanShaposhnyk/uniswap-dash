import { get } from "../../client";
import {
  PoolsResponseSchema,
  type MidgardPool,
} from "@/lib/rest/public/thorchain/midgard/queries/pools/schema";

const E8 = 1e8;

export async function getPools(params?: {
  status?: string;
  period?: string;
}): Promise<MidgardPool[]> {
  const raw = await get<unknown>("pools", params);
  return PoolsResponseSchema.parse(raw);
}
