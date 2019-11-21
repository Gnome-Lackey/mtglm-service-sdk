export interface RecordView {
  id: string;
  wins: number;
  losses: number;
}

export interface MatchView {
  id: string;
}

export interface SeasonView {
  id: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface PlayerView {
  id: string;
  email: string;
  name?: string;
  userName: string;
  totalWins: number;
  totalLosses: number;
  isFirstTimeLogin?: boolean;
  accountType: string;
}

export interface AuthView {
  body: {
    user: PlayerView;
  };
  headers: {
    "X-ID-Token": string;
    "X-Access-Token": string;
    "set-cookie": string;
  };
}
