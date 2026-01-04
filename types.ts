
export interface Chapter {
  title: string;
  summary: string;
}

export interface BookDeconstruction {
  title: string;
  author: string;
  genre: string;
  rating: number;
  oneSentenceSummary: string;
  targetAudience: string[];
  mainThemes: string[];
  keyChapters: Chapter[];
  practicalTakeaways: string[];
  criticalReview: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
