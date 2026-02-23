import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PoolList } from "@/app/dashboard/_components/PoolList";
import type { MidgardPoolWithTvl } from "@/lib/rest/public/thorchain/midgard/queries/pools/schema";

const mockPools: MidgardPoolWithTvl[] = [
  {
    asset: "BTC.BTC",
    assetDepth: "100000000000",
    runeDepth: "5000000000000",
    assetPriceUSD: "50000",
    status: "available",
    tvlUsd: 1_000_000,
  },
  {
    asset: "ETH.ETH",
    assetDepth: "50000000000",
    runeDepth: "2000000000000",
    assetPriceUSD: "3000",
    status: "available",
    tvlUsd: 500_000,
  },
];

describe("PoolList", () => {
  it("renders asset and TVL for each pool", () => {
    render(<PoolList pools={mockPools} />);
    expect(screen.getByText("BTC.BTC")).toBeInTheDocument();
    expect(screen.getByText("ETH.ETH")).toBeInTheDocument();
    expect(screen.getByText("$1,000,000")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
  });

  it("renders in order (same as props)", () => {
    render(<PoolList pools={mockPools} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("BTC.BTC");
    expect(items[1]).toHaveTextContent("ETH.ETH");
  });

  it("shows No pools when empty", () => {
    render(<PoolList pools={[]} />);
    expect(screen.getByText("No pools")).toBeInTheDocument();
  });
});
