export interface MatchPathParameters {
  matchId: string;
}

export interface PlayerPathParameters {
  playerId: string;
}

export interface RecordPathParameters {
  recordId: string;
}

export interface SeasonPathParameters {
  seasonId: string;
}

export interface PotentialPathParameters {
  matchId?: string;
  playerId?: string;
  seasonId?: string;
  recordId?: string;
}
