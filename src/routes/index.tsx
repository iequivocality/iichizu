import { createFileRoute } from '@tanstack/react-router';
import {
  getFlagByCode,
  Japan,
  type Prefecture,
  type PrefectureCode,
} from 'japan-prefectures-react';

import type { ReactNode } from 'react';
import { useStats } from '@/components/stat-provider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { columns, DataTable } from './-components/pref-table';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Route = createFileRoute('/')({
  component: App,
});

function PrefectureHover({
  prefecture,
  children,
}: { prefecture: Prefecture; children: ReactNode }) {
  const { currentYear, tourismStats } = useStats();

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className='flex items-center gap-2 w-48 h-16'>
        <div>{getFlagByCode(prefecture.code, { height: 24 })}</div>
        <div>
          <div className='font-bold'>
            {prefecture.romaji} ({prefecture.japanese})
          </div>
          <div>
            Visit Rate:{' '}
            {tourismStats[currentYear][
              prefecture.code as PrefectureCode
            ].visitRate.toFixed(2)}
            %
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

const getFillColor = (visitRate: number) => {
  if (visitRate <= 1) {
    return 'fill-red-200';
  } else if (visitRate <= 5) {
    return 'fill-red-300';
  } else if (visitRate <= 10) {
    return 'fill-red-500';
  } else {
    return 'fill-red-800';
  }
};

function App() {
  const { tourismStats } = useStats();

  return (
    <>
      <h1 className='font-bold text-2xl'>Visit Rates by Prefecture</h1>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <div className='col-span-3 p-4'>
          <Japan
            className='max-h-screen stroke-slate-400 fill-slate-100'
            prefectureProps={{
              className: 'transition-all stroke-gray-400',
            }}
            prefectureClassNames={Object.keys(tourismStats[2024]).reduce(
              (prev, key) => {
                const visitRate =
                  tourismStats[2024][key as PrefectureCode].visitRate;
                return {
                  ...prev,
                  [key]: getFillColor(visitRate),
                };
              },
              {},
            )}
            mapType='dense'
            PrefectureWrapperComponent={PrefectureHover}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='p-6 rounded-md border flex flex-col gap-4'>
            <h2 className='text-xl font-bold'>LEGEND</h2>
            <div className='flex items-center gap-2'>
              <div className='size-6 bg-red-800 rounded-md'></div>
              <div className='text-lg font-bold'>greater than 10%</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='size-6 bg-red-500 rounded-md'></div>
              <div className='text-lg font-bold'>5 - 10%</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='size-6 bg-red-300 rounded-md'></div>
              <div className='text-lg font-bold'>1 - 5%</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='size-6 bg-red-200 rounded-md'></div>
              <div className='text-lg font-bold'>less than 1%</div>
            </div>
            <p className='pt-4 font-italic'>
              Source:{' '}
              <a
                className='underline'
                href='https://statistics.jnto.go.jp/en/graph/#graph--inbound--prefecture--ranking'
              >
                Visit Rate Ranking by Prefecture
              </a>
            </p>
          </div>
          <h2 className='text-xl font-bold px-4'>Table Data</h2>
          <ScrollArea className='h-96'>
            <DataTable
              columns={columns}
              data={Object.keys(tourismStats[2024]).map((curr) => {
                const pref = tourismStats[2024][curr as PrefectureCode];
                return {
                  prefecture: pref.prefecture,
                  visitRate: pref.visitRate,
                };
              }, [])}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
