export interface MatchQueryParameters {
  winnerId?: string;
  loserId?: string;
  seasonId?: string;
  isSeasonPoint?: boolean;
}

export interface PlayerQueryParameters {
  name?: string;
  season?: string;
  userName?: string;
}

export interface ScryfallCardQueryParameters {
  color: string[];
  format: string;
  subtype: string;
  type: string[];
}

export interface SeasonQueryParams {
  active?: string;
}

export interface PotentialQueryParameters
  extends PlayerQueryParameters,
    ScryfallCardQueryParameters,
    MatchQueryParameters,
    SeasonQueryParams {
  [key: string]: string | string[] | boolean | number;
}
