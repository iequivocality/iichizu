import { useQuery } from '@tanstack/react-query';
import type { PrefectureCode } from 'japan-prefectures-react';
import { createContext, useContext } from 'react';

export type StatContextType = {
  tourismStats: TourismStats;
  currentYear: AvailableYears;
};

export type AvailableYears = 2024 | 2023;

export type TourismStats = Record<AvailableYears, Record<PrefectureCode, {prefecture: string, visit_rate: number}>>

const StatContext = createContext<StatContextType | undefined>(undefined);

export function StatProvider({ children }: { children: React.ReactNode }) {
  const { data: tourismStats, isFetching } = useQuery<TourismStats>({ queryKey: ['todos'], queryFn: async () => {
    const response = await fetch('./tourism.json');
    return await response.json();
  }});
  if (tourismStats === undefined || isFetching) {
    return <div>Loading...</div>;
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