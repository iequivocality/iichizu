import { createFileRoute } from '@tanstack/react-router';
import {
  Japan,
  type Prefecture,
  type PrefectureCode
} from "japan-prefectures-react";

import type { ReactNode } from 'react';
import { useStats } from '@/components/stat-provider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const Route = createFileRoute('/')({
  component: App,
});

function PrefectureHover({ prefecture, children }: { prefecture: Prefecture, children: ReactNode }) {
  const { currentYear, tourismStats } = useStats();

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="flex flex-col w-40 h-16">
        <span className='font-bold'>{prefecture.romaji} ({prefecture.japanese})</span>
        <span>Visit Rate: {tourismStats[currentYear][prefecture.code as PrefectureCode].visit_rate.toFixed(2)}%</span>
      </TooltipContent>
    </Tooltip>
  );
}

function App() {
  const { tourismStats } = useStats();

  const getFillColor = (visit_rate: number) => {
    if (visit_rate <= 1) {
      return "fill-red-200";
    } else if (visit_rate <= 5) {
      return "fill-red-300";
    } else if (visit_rate <= 10) {
      return "fill-red-500";
    } else {
      return "fill-red-800";
    }
  };

  return (
    <div className='grid grid-cols-4 px-8 py-12'>
      <div className='col-span-2 p-4'>
        <h1 className='font-bold text-2xl'>Visit Rates by Prefecture</h1>
        <Japan
          className="max-h-screen stroke-slate-400 fill-slate-100"
          prefectureProps={{
            className:
              "transition-all stroke-gray-400",
          }}
          prefectureClassNames={Object.keys(tourismStats[2024]).reduce((prev, key) => {
            const visit_rate = tourismStats[2024][key as PrefectureCode].visit_rate;
            return {
              ...prev,
              [key]: getFillColor(visit_rate),
            };
          }, {})}
          mapType='dense'
          PrefectureWrapperComponent={PrefectureHover}
        />
      </div>
      <div className='col-span-2 flex flex-col gap-4'>
        <h2 className='text-xl font-bold'>LEGEND</h2>
        <div className='flex items-center gap-2'>
          <div className='size-10 bg-red-800 rounded-md'></div>
          <div className='text-lg font-bold'>greater than 10%</div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='size-10 bg-red-500 rounded-md'></div>
          <div className='text-lg font-bold'>5 - 10%</div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='size-10 bg-red-300 rounded-md'></div>
          <div className='text-lg font-bold'>1 - 5%</div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='size-10 bg-red-200 rounded-md'></div>
          <div className='text-lg font-bold'>less than 1%</div>
        </div>
      </div>
    </div>
  );
}
