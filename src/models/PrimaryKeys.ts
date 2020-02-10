export interface MatchPrimaryKey {
  matchId: string;
}

export interface PlayerPrimaryKey {
  playerId: string;
}

export interface RecordPrimaryKey {
  recordId: string;
  matchId?: string;
}

export interface SeasonPrimaryKey {
  seasonId: string;
  startDate?: string;
}

export interface SeasonMetadataKey {
  seasonMetadataId: string;
  seasonId?: string;
}

export interface PotentialPrimaryKey {
  matchId?: string;
  playerId?: string;
  seasonMetadataId?: string;
  seasonId?: string;
  recordId?: string;
}
