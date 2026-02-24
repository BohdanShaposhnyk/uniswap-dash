'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/styles';

const navLink =
  "text-sm font-medium transition-colors";

const navLinkInactive =
  "text-muted-foreground hover:text-foreground";

const navLinkActive =
  "text-foreground font-semibold";

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'TC dash' },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="border-border bg-background sticky top-0 z-10 border-b"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex h-14 items-center gap-6 px-4">
        {NAV_ITEMS.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                navLink,
                isActive ? navLinkActive : navLinkInactive,
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
