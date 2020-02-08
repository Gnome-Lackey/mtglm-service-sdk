export interface MatchFilters {
  matchId?: string;
  seasonId?: string;
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
