'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ListSlotError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('List slot error:', error);
  }, [error]);

  return (
    <Card>
      <CardContent className="py-6">
        <p className="text-destructive font-medium mb-2">Failed to load pools</p>
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
  );
}
