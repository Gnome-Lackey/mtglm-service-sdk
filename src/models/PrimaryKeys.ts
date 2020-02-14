export interface MatchPrimaryKey {
  matchId: string;
}

export interface PlayerPrimaryKey {
  playerId: string;
}

export interface SeasonPrimaryKey {
  seasonId: string;
}

export interface SeasonMetadataKey {
  seasonId?: string;
  playerId?: string;
}

export interface PotentialPrimaryKey {
  matchId?: string;
  playerId?: string;
  seasonId?: string;
  recordId?: string;
}
