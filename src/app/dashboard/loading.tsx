import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonRow() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-20" />
      </CardContent>
    </Card>
  );
}

export default function DashboardLoading() {
  return (
    <main className="container max-w-2xl mx-auto py-8 px-4">
      <Skeleton className="h-8 w-48 mb-6" />
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        <li>
          <SkeletonRow />
        </li>
        <li>
          <SkeletonRow />
        </li>
        <li>
          <SkeletonRow />
        </li>
      </ul>
    </main>
  );
}
