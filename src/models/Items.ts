export interface MatchDynamoCreateItem {
  matchId: string;
  seasonId: string;
  playerRecords: string[];
  updatedOn: string;
}

export interface MatchDynamoUpdateItem {
  seasonId: string;
  playerRecords: string[];
}

export interface PlayerDynamoCreateItem {
  playerId: string;
  playerName: string;
  userName: string;
  email: string;
  totalMatchWins: number;
  totalMatchLosses: number;
  epithet: string;
  favoriteColors: string[];
  matchIds?: string[];
  updatedOn: string;
}

export interface PlayerDynamoUpdateItem {
  playerName?: string;
  userName?: string;
  email?: string;
  totalMatchWins?: number;
  totalMatchLosses?: number;
  epithet?: string;
  favoriteColors?: string[];
  matchIds?: string[];
}

export interface RecordDynamoCreateItem {
  recordId: string;
  wins: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
}

export interface RecordDynamoUpdateItem {
  wins?: number;
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
