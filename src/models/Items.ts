export interface MatchDynamoCreateItem {
  matchId: string;
  seasonId: string;
  isSeasonPoint: boolean;
  wins: number;
  gamesPlayed: number;
  winnerId: string;
  loserIds: string[];
  updatedOn: string;
}

export interface MatchDynamoUpdateItem {
  isSeasonPoint?: boolean;
  wins?: number;
  gamesPlayed?: number;
  winnerId?: string;
  loserIds?: string[];
}

export interface PlayerDynamoCreateItem {
  playerId: string;
  playerName: string;
  userName: string;
  email: string;
  epithet: string;
  favoriteColors: string[];
  updatedOn: string;
}

export interface PlayerDynamoUpdateItem {
  playerName?: string;
  userName?: string;
  email?: string;
  epithet?: string;
  favoriteColors?: string[];
}

export interface SeasonDynamoCreateItem {
  seasonId: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  setCode: string;
  playerIds: string[];
  updatedOn: string;
}

export interface SeasonDynamoUpdateItem {
  isActive?: boolean;
  endDate?: string;
  setCode?: string;
  playerIds?: string[];
}

export interface SeasonMetadataDynamoCreateItem {
  seasonId: string;
  playerId: string;
  playedOpponentIds?: string[];
  seasonWins: number;
  seasonLosses: number;
  totalWins: number;
  totalLosses: number;
  matchIds?: string[];
  updatedOn: string;
}

export interface SeasonMetadataDynamoUpdateItem {
  playedOpponentIds?: string[];
  seasonWins?: number;
  seasonLosses?: number;
  totalWins?: number;
  totalLosses?: number;
  matchIds?: string[];
}
