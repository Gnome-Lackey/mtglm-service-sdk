export interface MatchView {
  id: string;
  isSeasonPoint: boolean;
}

export interface PlayerView {
  id: string;
  email: string;
  displayName?: string;
  userName: string;
  epithet: string;
  colors: string[];
}

export interface PlayerRoleView {
  id: string;
  email: string;
  displayName?: string;
  userName: string;
}

export interface RecordView {
  id: string;
  wins: number;
}

export interface ScryfallCardView {
  id: string;
  name: string;
  language: string;
  releasedOn: string;
  image: string;
  costs: {
    mana: string;
    converted: number;
  };
  type: string;
  subtype: string;
  colors: string[];
  identity: string[];
  set: {
    code: string;
    name: string;
  };
  rarity: string;
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

export interface SeasonMetadataView {
  seasonWins: number;
  seasonLosses: number;
  totalWins: number;
  totalLosses: number;
}
