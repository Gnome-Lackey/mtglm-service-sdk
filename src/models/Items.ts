export interface MatchDynamoCreateItem {
  matchId: string;
  playerARecordId: string;
  playerBRecordId: string;
  updatedOn: string;
}

export interface MatchDynamoUpdateItem {
  playerARecordId?: string;
  playerBRecordId?: string;
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
  losses: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
}

export interface RecordDynamoUpdateItem {
  wins?: number;
  losses?: number;
}

export interface SeasonDynamoCreateItem {
  seasonId: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  setId: string;
  playerIds: string[];
  matchIds?: string[];
  updatedOn: string;
}

export interface SeasonDynamoUpdateItem {
  isActive?: boolean;
  endDate?: string;
  playerIds?: string[];
  matchIds?: string[];
}
