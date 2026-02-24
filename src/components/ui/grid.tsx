import * as React from 'react';
import { cn } from '@/lib/utils/styles';

/**
 * Fluid autofit grid: 3–6 columns depending on container width.
 * Column min width ~200px, max 6 columns (min 100%/6).
 */
function Grid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="grid"
      className={cn(
        'grid gap-4',
        'grid-cols-[repeat(auto-fill,minmax(min(100%_/_6,200px),1fr))]',
        className,
      )}
      {...props}
    />
  );
}

export { Grid };
