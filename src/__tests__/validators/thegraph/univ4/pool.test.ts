import { describe, it, expect } from "vitest";
import {
  parseTopPoolsResponse,
  TopPoolsResponseSchema,
} from "@/lib/graphql/validators/pool";

const validResponse = {
  data: {
    pools: [
      {
        id: "0xabc",
        totalValueLockedUSD: "1234567.89",
        token0: { symbol: "ETH" },
        token1: { symbol: "USDC" },
      },
      {
        id: "0xdef",
        totalValueLockedUSD: "500000",
        token0: { symbol: "WETH" },
        token1: { symbol: "USDT" },
      },
    ],
  },
};

describe("parseTopPoolsResponse", () => {
  it("parses valid response and returns pools array", () => {
    const pools = parseTopPoolsResponse(validResponse);
    expect(pools).toHaveLength(2);
    expect(pools[0].id).toBe("0xabc");
    expect(pools[0].token0.symbol).toBe("ETH");
    expect(pools[0].token1.symbol).toBe("USDC");
    expect(pools[0].totalValueLockedUSD).toBe("1234567.89");
  });

  it("throws on invalid shape (missing data.pools)", () => {
    expect(() => parseTopPoolsResponse({ data: {} })).toThrow();
  });

  it("throws on invalid shape (pools not array)", () => {
    expect(() =>
      parseTopPoolsResponse({ data: { pools: "not-array" } })
    ).toThrow();
  });

  it("throws on invalid pool (missing token0)", () => {
    expect(() =>
      parseTopPoolsResponse({
        data: {
          pools: [
            {
              id: "0x",
              totalValueLockedUSD: "0",
              token1: { symbol: "USDC" },
            },
          ],
        },
      })
    ).toThrow();
  });
});

describe("TopPoolsResponseSchema", () => {
  it("accepts valid response", () => {
    const result = TopPoolsResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it("rejects null", () => {
    const result = TopPoolsResponseSchema.safeParse(null);
    expect(result.success).toBe(false);
  });
});
