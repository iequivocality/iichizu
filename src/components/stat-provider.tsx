import type { AvailableYears, TourismStats } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

export type StatContextType = {
  tourismStats: TourismStats;
  currentYear: AvailableYears;
};

const StatContext = createContext<StatContextType | undefined>(undefined);

export function StatProvider({ children }: { children: React.ReactNode }) {
  const { data: tourismStats, isFetching } = useQuery<TourismStats>({
    queryKey: ['tourismStats'],
    queryFn: async () => {
      const response = await fetch('./tourism.json');
      return await response.json();
    },
  });
  if (tourismStats === undefined || isFetching) {
    return (
      <div className='h-[calc(100vh-160px)] min-w-screen flex justify-center items-center'>
        Loading...
      </div>
    );
  }

  return (
    <StatContext.Provider value={{ tourismStats, currentYear: 2024 }}>
      {children}
    </StatContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatProvider');
  }
  return context;
}
