import {
  scaleTime,
  scaleLinear,
  line as d3line,
  min,
  max,
  area as d3area,
  curveMonotoneX,
} from 'd3';
import { CSSProperties } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { defaultData } from '@/lib/config/charts/defaultData';

export type AreaChartDatum = { date: Date; value: number };

export type AreaChartXAxisConfig = {
  tickCount: number;
  format: (d: Date) => string;
};

type AreaChartProps = {
  data?: AreaChartDatum[];
  formatY?: (value: number) => string;
  xAxis?: AreaChartXAxisConfig;
};

const defaultFormatY = (v: number) =>
  Number.isFinite(v) ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : String(v);

const defaultFormatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export function AreaChart({ data = defaultData, formatY, xAxis }: AreaChartProps) {
  if (data.length === 0) {
    return null;
  }
  let xScale = scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);

  let yMin = min(data.map((d) => d.value)) ?? 0;
  let yMax = max(data.map((d) => d.value)) ?? 0;
  if (yMin === yMax) {
    yMin = yMin === 0 ? 0 : yMin * 0.99;
    yMax = yMax === 0 ? 1 : yMax * 1.01;
  }
  let yScale = scaleLinear().domain([yMin, yMax]).range([100, 0]).nice();

  const yTickFormat = formatY ?? defaultFormatY;
  const yTicks = yScale.ticks(8);

  let line = d3line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  let area = d3area<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y0(yScale(yScale.domain()[0]))
    .y1((d) => yScale(d.value))
    .curve(curveMonotoneX);

  let areaPath = area(data) ?? undefined;

  let d = line(data);

  if (!d) {
    return null;
  }

  return (
    <div
      className="relative h-72 w-full"
      style={
        {
          '--marginTop': '0px',
          '--marginRight': '10px',
          '--marginBottom': '15px',
          '--marginLeft': '0px',
        } as CSSProperties
      }
    >
      {/* Chart area */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
          "
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Area */}
          <path d={areaPath} className="text-purple-200 dark:text-purple-400" fill="currentColor" />

          {/* Line */}
          <path
            d={d}
            fill="none"
            className="text-gray-50 dark:text-zinc-800"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Tooltip hit areas and vertical line on hover */}
          {data.map((d, index) => {
            const prevX = index > 0 ? xScale(data[index - 1].date) : xScale(d.date);
            const nextX = index < data.length - 1 ? xScale(data[index + 1].date) : xScale(d.date);
            const leftBound = (prevX + xScale(d.date)) / 2;
            const rightBound = (xScale(d.date) + nextX) / 2;
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <g className="group/tooltip">
                    <line
                      x1={xScale(d.date)}
                      y1={0}
                      x2={xScale(d.date)}
                      y2={100}
                      stroke="currentColor"
                      strokeWidth={1}
                      className="opacity-0 group-hover/tooltip:opacity-100 text-zinc-300 dark:text-zinc-700 transition-opacity pointer-events-none"
                      vectorEffect="non-scaling-stroke"
                      style={{ pointerEvents: 'none' }}
                    />
                    <rect
                      x={leftBound}
                      y={0}
                      width={rightBound - leftBound}
                      height={100}
                      fill="transparent"
                    />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{xAxis?.format(d.date) ?? defaultFormatDate(d.date)}</div>
                  <div className="text-muted-foreground text-sm">{yTickFormat(d.value)}</div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </svg>

        {/* X Axis */}
        <div className="translate-y-1">
          {xAxis != null
            ? xScale.ticks(xAxis.tickCount).map((tickDate, i, arr) => (
                <div key={i} className="overflow-visible text-zinc-500">
                  <div
                    style={{
                      left: `${xScale(tickDate)}%`,
                      top: '100%',
                      transform: `translateX(${i === 0 ? '0%' : i === arr.length - 1 ? '-100%' : '-50%'})`,
                    }}
                    className="text-xs absolute whitespace-nowrap"
                  >
                    {xAxis.format(tickDate)}
                  </div>
                </div>
              ))
            : data.map((day, i) => {
                const isFirst = i === 0;
                const isLast = i === data.length - 1;
                const isMax = day.value === Math.max(...data.map((d) => d.value));
                if (!isFirst && !isLast && !isMax) return null;
                return (
                  <div key={i} className="overflow-visible text-zinc-500">
                    <div
                      style={{
                        left: `${xScale(day.date)}%`,
                        top: '100%',
                        transform: `translateX(${i === 0 ? '0%' : i === data.length - 1 ? '-100%' : '-50%'})`,
                      }}
                      className="text-xs absolute whitespace-nowrap"
                    >
                      {defaultFormatDate(day.date)}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Y axis */}
      <div
        className="absolute right-0 top-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          w-[var(--marginRight)]
          overflow-visible
        "
      >
        {yTicks.map((value, i) => (
          <div
            key={i}
            style={{
              top: `${yScale(value)}%`,
              left: '0%',
            }}
            className="absolute text-xs -translate-y-1/2 text-gray-400 w-full text-right pl-1"
          >
            {yTickFormat(value)}
          </div>
        ))}
      </div>
    </div>
  );
}
