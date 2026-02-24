import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Grid } from '@/components/ui/grid';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonCard() {
  return (
    <Card className="flex flex-col gap-4 py-4 aspect-square min-h-0">
      <CardHeader className="px-4 pb-0">
        <CardTitle className="text-base leading-tight">
          <Skeleton className="h-5 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardDescription className="px-4">
        <Skeleton className="h-4 w-20" />
      </CardDescription>
      <CardContent className="px-4">
        <Skeleton className="h-4 w-20" />
      </CardContent>
    </Card>
  );
}

export default function DashboardLoading() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-8">
      <Skeleton className="mb-6 h-8 w-48" />
      <Grid>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </Grid>
    </main>
  );
}
