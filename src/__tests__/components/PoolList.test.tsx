import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PoolList } from '@/features/dashboard/list/components/PoolList';
import type { MidgardPool } from '@/lib/rest/public/thorchain/midgard/queries/pools/schema.response';

const mockGet = vi.fn();
const mockPathname = vi.fn(() => '/dashboard');
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
  usePathname: () => mockPathname(),
}));

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
  beforeEach(() => {
    mockGet.mockReturnValue(null);
    mockPathname.mockReturnValue('/dashboard');
  });

  it('renders asset, price and volume for each pool', () => {
    render(<PoolList pools={mockPools} />);
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText(/50,000\.00/)).toBeInTheDocument();
    expect(screen.getByText(/3,000\.00/)).toBeInTheDocument();
    expect(screen.getByText(/1\.2M/)).toBeInTheDocument();
    expect(screen.getByText(/500K/)).toBeInTheDocument();
  });

  it('renders links with ?selected= assetRaw for each pool', () => {
    render(<PoolList pools={mockPools} />);
    const btcLink = screen.getByRole('link', { name: /BTC/ });
    const ethLink = screen.getByRole('link', { name: /ETH/ });
    expect(btcLink).toHaveAttribute('href', '/dashboard/BTC.BTC');
    expect(ethLink).toHaveAttribute('href', '/dashboard/ETH.ETH');
  });

  it('highlights selected pool when searchParams.selected matches assetRaw', () => {
    mockPathname.mockReturnValue('/dashboard/ETH.ETH');
    render(<PoolList pools={mockPools} />);
    const links = screen.getAllByRole('link');
    const ethLink = links.find((l) => l.getAttribute('href') === '/dashboard/ETH.ETH');
    expect(ethLink).toHaveClass('bg-muted');
    const btcLink = links.find((l) => l.getAttribute('href') === '/dashboard/BTC.BTC');
    expect(btcLink).not.toHaveClass('bg-muted');
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
