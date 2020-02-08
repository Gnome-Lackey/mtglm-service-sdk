export interface MatchPrimaryKey {
  matchId: string;
}

export interface PlayerPrimaryKey {
  playerId: string;
}

export interface PlayerSeasonMetadataKey {
  playerSeasonMetaId: string;
  playerId?: string;
  seasonId?: string;
}

export interface RecordPrimaryKey {
  recordId: string;
  matchId?: string;
}

export interface SeasonPrimaryKey {
  seasonId: string;
  startDate?: string;
}

export interface PotentialPrimaryKey {
  matchId?: string;
  playerId?: string;
  playerSeasonMetaId?: string;
  seasonId?: string;
  recordId?: string;
}
