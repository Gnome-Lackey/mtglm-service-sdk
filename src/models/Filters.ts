export interface MatchFilters {
  isSeasonPoint?: boolean;
  loserIds?: string[];
  matchId?: string;
  seasonId?: string;
  winnerIds?: string[];
}

export interface PlayerFilters {
  playerId?: string;
  playerName?: string;
  userName?: string;
}

export interface SeasonFilters {
  isActive?: boolean;
  seasonId?: string;
  startDate?: string;
}
