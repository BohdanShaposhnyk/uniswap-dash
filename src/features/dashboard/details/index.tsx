import { getDepths } from '@/lib/rest/public/thorchain/midgard/queries/depths';
import type { GetDepthsQueryParams } from '@/lib/rest/public/thorchain/midgard/queries/depths/schema.request';
import { parseMidgradAssetName } from '@/lib/utils/parseMidgradAssetName';
import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card';
import { DetailsFilters } from './DetailsFilters';
import { AssetPriceChart } from './AssetPriceChart';
import { parseDepthsSearchParams } from '@/lib/config/charts/midgardDepthXScale';
import { PriceChangeIndicator } from './PriceChangeIndicator';

type Props = {
  params: Promise<{ pool: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DashboardDetails({ params, searchParams }: Props) {
  const { pool } = await params;
  const { asset, chain } = parseMidgradAssetName(pool);
  const resolvedSearchParams = await searchParams;
  const { range, interval, count } = parseDepthsSearchParams(resolvedSearchParams);

  const data = await getDepths(pool, {
    queryParams: { interval: interval as GetDepthsQueryParams['interval'], count: String(count) },
  });

  return (
    <>
      <h1 className="text-lg font-semibold mb-2">
        {asset} (on {chain}) price
      </h1>
      <Card className="w-full">
        <CardHeader>
          <DetailsFilters pool={pool} range={range} />
          <CardAction>
            <PriceChangeIndicator intervals={data.intervals} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <AssetPriceChart intervals={data.intervals} range={range} />
        </CardContent>
      </Card>
    </>
  );
}
