export interface MatchFilters {
  matchId?: string;
  seasonId?: string;
  isSeasonPoint?: boolean;
  winnerId?: string;
  loserIds?: string[];
}

export interface PlayerFilters {
  playerId?: string;
  playerName?: string;
  userName?: string;
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
