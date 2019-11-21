export interface MatchPathParameters {
  matchId: string;
}

export interface PlayerPathParameters {
  playerUserName: string;
}

export interface RecordPathParameters {
  recordId: string;
}

export interface SeasonPathParameters {
  seasonId: string;
}

export interface SetPathParameters {
  setId: string;
}

export interface PotentialPathParameters {
  matchId?: string;
  playerUserName?: string;
  seasonId?: string;
  setId?: string;
  recordId?: string;
}
