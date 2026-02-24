'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <main className="container max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardContent className="py-6">
          <p className="text-destructive font-medium mb-2">Something went wrong</p>
          <p className="text-muted-foreground text-sm mb-4">{error.message}</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    </main>
  );
}
