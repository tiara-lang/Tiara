export type Score = 1 | 2 | 3 | 4 | 5;

export interface Indicator {
  id: string;
  category: string;
  text: string;
  description?: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  nisn: string;
}

export interface DailyRecord {
  id: string;
  studentId: string;
  date: string; // ISO format
  scores: Record<string, Score>;
  activityLog: string;
  summary?: string;
}

export interface CategoryAverage {
  category: string;
  average: number;
}
