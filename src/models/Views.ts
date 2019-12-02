export interface MatchView {
  id: string;
}

export interface PlayerView {
  id: string;
  email: string;
  displayName?: string;
  userName: string;
  epithet: string;
  colors: string[];
  totalWins: number;
  totalLosses: number;
}

export interface RecordView {
  id: string;
  wins: number;
  losses: number;
}

export interface SeasonView {
  id: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}
