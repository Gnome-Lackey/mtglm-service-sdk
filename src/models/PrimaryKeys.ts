export interface MatchPrimaryKey {
  matchId: string;
}

export interface PlayerPrimaryKey {
  playerId: string;
}

export interface RecordPrimaryKey {
  recordId: string;
  matchId: string;
}

export interface SeasonPrimaryKey {
  seasonId: string;
}

export interface PotentialPrimaryKey {
  matchId?: string;
  playerId?: string;
  seasonId?: string;
  recordId?: string;
}
