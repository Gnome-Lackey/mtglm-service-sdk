export interface MatchPathParameters {
  matchId?: string;
}

export interface PlayerPathParameters {
  playerId?: string;
}

export interface ScryfallCardPathParameters {
  cardId?: string;
}

export interface ScryfallSetPathParameters {
  code?: string;
}

export interface SeasonPathParameters {
  playerId?: string;
  seasonId?: string;
}

export interface PotentialPathParameters {
  cardId?: string;
  code?: string;
  matchId?: string;
  playerId?: string;
  seasonId?: string;
}
