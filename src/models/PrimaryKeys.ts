export interface MatchPrimaryKey {
  matchId: string;
}

export interface PlayerPrimaryKey {
  playerId: string;
}

export interface SeasonPrimaryKey {
  seasonId: string;
}

export interface SetPrimaryKey {
  setId: string;
}

export interface RecordPrimaryKey {
  recordId: string;
  matchId: string;
}

export interface PotentialPrimaryKey {
  matchId?: string;
  playerId?: string;
  seasonId?: string;
  setId?: string;
  recordId?: string;
}
