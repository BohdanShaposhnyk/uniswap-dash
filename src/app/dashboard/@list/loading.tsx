import { Skeleton } from '@/components/ui/skeleton';

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between gap-4 py-3 px-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export default function ListSlotLoading() {
  return (
    <>
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="divide-y divide-border rounded-md border border-border">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    </>
  );
}
