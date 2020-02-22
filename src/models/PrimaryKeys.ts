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
  playerId?: string;
  seasonId?: string;
}

export interface PotentialPrimaryKey {
  matchId?: string;
  playerId?: string;
  recordId?: string;
  seasonId?: string;
}
