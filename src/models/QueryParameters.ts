export interface MatchQueryParameters {
  winnerId?: string;
  "*winnerId"?: string;
  loserId?: string;
  "*loserId"?: string;
  seasonId?: string;
  "*seasonId"?: string;
  isSeasonPoint?: boolean;
  "*isSeasonPoint"?: boolean;
}

export interface PlayerQueryParameters {
  name?: string;
  "*name"?: string;
  season?: string;
  "*season"?: string;
  userName?: string;
  "*userName"?: string;
}

export interface ScryfallCardQueryParameters {
  color?: string[];
  format?: string;
  subtype?: string;
  type?: string[];
}

export interface SeasonQueryParams {
  active?: boolean;
  "*active"?: boolean;
}

export interface PotentialQueryParameters
  extends PlayerQueryParameters,
    ScryfallCardQueryParameters,
    MatchQueryParameters,
    SeasonQueryParams {
  [key: string]: string | string[] | boolean | number;
}
