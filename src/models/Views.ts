export interface RecordView {
  id: string;
  wins: number;
  losses: number;
}

export interface MatchView {
  id: string;
}

export interface PlayerView {
  id: string;
  name: string;
  totalWins: number;
  totalLosses: number;
}

export interface SeasonView {
  id: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}
