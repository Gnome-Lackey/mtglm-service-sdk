export interface MatchView {
  id: string;
  isSeasonPoint: boolean;
  games: number;
  wins: number;
}

export interface PlayerView {
  colors?: string[];
  displayName?: string;
  email: string;
  epithet?: string;
  id: string;
  userName: string;
}

export interface PlayerRoleView {
  displayName?: string;
  email: string;
  id: string;
  userName: string;
}

export interface ScryfallCardView {
  colors: string[];
  costs: {
    mana: string;
    converted: number;
  };
  id: string;
  identity: string[];
  image: string;
  language: string;
  name: string;
  rarity: string;
  releasedOn: string;
  set: {
    code: string;
    name: string;
  };
  subtype: string;
  type: string;
}

export interface ScryfallSetView {
  cardCount: number;
  code: string;
  id: string;
  name: string;
  releasedOn: string;
}

export interface SeasonView {
  endedOn?: string;
  id: string;
  isActive: boolean;
  startedOn: string;
}
