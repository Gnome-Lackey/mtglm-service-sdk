export interface MatchDynamoCreateItem {
  gamesPlayed: number;
  isSeasonPoint: boolean;
  loserIds: string[];
  matchId: string;
  seasonId: string;
  updatedOn: string;
  winnerIds: string[];
  wins: number;
}

export interface MatchDynamoUpdateItem {
  gamesPlayed?: number;
  isSeasonPoint?: boolean;
  loserIds?: string[];
  winnerIds?: string;
  wins?: number;
}

export interface PlayerDynamoCreateItem {
  email: string;
  epithet: string;
  favoriteColors: string[];
  playerId: string;
  playerName: string;
  updatedOn: string;
  userName: string;
}

export interface PlayerDynamoUpdateItem {
  email?: string;
  epithet?: string;
  favoriteColors?: string[];
  playerName?: string;
  userName?: string;
}

export interface SeasonDynamoCreateItem {
  endDate: string;
  isActive: boolean;
  playerIds: string[];
  seasonId: string;
  setCode: string;
  startDate: string;
  updatedOn: string;
}

export interface SeasonDynamoUpdateItem {
  endDate?: string;
  isActive?: boolean;
  playerIds?: string[];
  setCode?: string;
}
