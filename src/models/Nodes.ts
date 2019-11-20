export interface RecordNode {
  recordId: string;
  wins: number;
  losses: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
}

export interface MatchNode {
  matchId: string;
  playerARecordId: string;
  playerBRecordId: string;
  updatedOn: string;
}

export interface PlayerNode {
  playerId: string;
  playerName: string;
  totalMatchWins: number;
  totalMatchLosses: number;
  matchIds: string[];
  updatedOn: string;
}

export interface SeasonNode {
  seasonId: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  setId: string;
  playerIds: string[];
  matchIds: string[];
  updatedOn: string;
}

export interface SetNode {
  setId: string;
  setName: string;
  icon: string;
  updatedOn: string;
}
