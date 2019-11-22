export interface MatchDynamoItem {
  matchId: string;
  playerARecordId: string;
  playerBRecordId: string;
  updatedOn: string;
}

export interface PlayerDynamoItem {
  playerId?: string;
  playerName: string;
  userName: string;
  email: string;
  totalMatchWins: number;
  totalMatchLosses: number;
  matchIds: string[];
  updatedOn: string;
}

export interface RecordDynamoItem {
  recordId: string;
  wins: number;
  losses: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
}

export interface SeasonDynamoItem {
  seasonId: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  setId: string;
  playerIds: string[];
  matchIds: string[];
  updatedOn: string;
}

export interface SetDynamoItem {
  setId: string;
  setName: string;
  icon: string;
  updatedOn: string;
}
