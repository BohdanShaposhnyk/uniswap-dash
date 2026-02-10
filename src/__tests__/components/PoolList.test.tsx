import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PoolList } from "@/app/dashboard/_components/PoolList";
import type { Pool } from "@/lib/validators/pool";

const mockPools: Pool[] = [
  {
    id: "0x1",
    totalValueLockedUSD: "1000000",
    token0: { symbol: "ETH" },
    token1: { symbol: "USDC" },
  },
  {
    id: "0x2",
    totalValueLockedUSD: "500000",
    token0: { symbol: "WETH" },
    token1: { symbol: "USDT" },
  },
];

describe("PoolList", () => {
  it("renders token symbol and TVL for each pool", () => {
    render(<PoolList pools={mockPools} />);
    expect(screen.getByText("ETH / USDC")).toBeInTheDocument();
    expect(screen.getByText("WETH / USDT")).toBeInTheDocument();
    expect(screen.getByText("$1,000,000")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
  });

  it("renders in order (same as props)", () => {
    render(<PoolList pools={mockPools} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("ETH / USDC");
    expect(items[1]).toHaveTextContent("WETH / USDT");
  });

  it("shows No pools when empty", () => {
    render(<PoolList pools={[]} />);
    expect(screen.getByText("No pools")).toBeInTheDocument();
  });
});
