export interface MatchView {
  id: string;
}

export interface PlayerView {
  id: string;
  email: string;
  name?: string;
  userName: string;
  totalWins: number;
  totalLosses: number;
  accountType: string;
  isFirstTimeLogin?: boolean;
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
