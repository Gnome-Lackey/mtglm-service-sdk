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
}

export interface ScryfallSetView {
  id: string;
  code: string;
  name: string;
  releasedOn: string;
  cardCount: number;
}

export interface SeasonView {
  id: string;
  isActive: boolean;
  startedOn: string;
  endedOn: string;
}
