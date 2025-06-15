import type { PrefectureCode } from 'japan-prefectures-react';

export type AvailableYears = 2024 | 2023;

export type PrefectureTourismStat = { prefecture: string; visitRate: number };

export type TourismStats = Record<
  AvailableYears,
  Record<PrefectureCode, PrefectureTourismStat>
>;
