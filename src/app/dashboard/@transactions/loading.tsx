import { Skeleton } from '@/components/ui/skeleton';

export default function TransactionsSlotLoading() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-20 w-full rounded-md" />
      <Skeleton className="h-20 w-full rounded-md" />
      <Skeleton className="h-20 w-full rounded-md" />
    </div>
  );
}
