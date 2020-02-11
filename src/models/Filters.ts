export interface MatchFilters {
  matchId?: string;
  seasonId?: string;
  isSeasonPoint?: boolean;
  recordIds?: string[];
}

export interface PlayerFilters {
  playerId?: string;
  playerName?: string;
  userName?: string;
}

export interface RecordFilters {
  recordId?: string;
  playerId?: string;
  matchId?: string;
}

export interface SeasonFilters {
  startDate?: string;
  seasonId?: string;
  isActive?: boolean;
}

export interface SeasonMetadataFilters {
  playerId?: string;
  seasonId?: string;
}
