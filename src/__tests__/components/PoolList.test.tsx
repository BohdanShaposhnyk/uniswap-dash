import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PoolList } from '@/app/dashboard/_components/PoolList';
import type { MidgardPool } from '@/lib/rest/public/thorchain/midgard/queries/pools/schema.response';

const mockPools: MidgardPool[] = [
  {
    asset: 'BTC',
    chain: 'BTC',
    assetRaw: 'BTC.BTC',
    assetDepth: '100000000000',
    runeDepth: '5000000000000',
    assetPrice: 50000,
    assetPriceUSD: '50,000.00',
    status: 'available',
    volume24h: '1.2M',
    volume24hRaw: 120000000,
  },
  {
    asset: 'ETH',
    chain: 'ETH',
    assetRaw: 'ETH.ETH',
    assetDepth: '50000000000',
    runeDepth: '2000000000000',
    assetPrice: 3000,
    assetPriceUSD: '3,000.00',
    status: 'available',
    volume24h: '500K',
    volume24hRaw: 500000000,
  },
];

describe('PoolList', () => {
  it('renders asset, price and volume for each pool', () => {
    render(<PoolList pools={mockPools} />);
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText(/50,000\.00/)).toBeInTheDocument();
    expect(screen.getByText(/3,000\.00/)).toBeInTheDocument();
    expect(screen.getByText(/1\.2M/)).toBeInTheDocument();
    expect(screen.getByText(/500K/)).toBeInTheDocument();
  });

  it('renders in order (same as props)', () => {
    render(<PoolList pools={mockPools} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('BTC');
    expect(items[1]).toHaveTextContent('ETH');
  });

  it('shows No pools when empty', () => {
    render(<PoolList pools={[]} />);
    expect(screen.getByText('No pools')).toBeInTheDocument();
  });
});
