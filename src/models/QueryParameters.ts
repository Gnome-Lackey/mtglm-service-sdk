export interface MatchQueryParameters {
  winnerIds?: string | string[];
  "*winnerIds"?: string | string[];
  loserIds?: string | string[];
  "*loserIds"?: string | string[];
  seasonId?: string;
  "*seasonId"?: string;
  isSeasonPoint?: boolean;
  "*isSeasonPoint"?: boolean;
}

export interface PlayerQueryParameters {
  name?: string;
  "*name"?: string;
  seasonId?: string;
  "*season"?: string;
  userName?: string;
  "*userName"?: string;
}

export interface ScryfallCardQueryParameters {
  colors?: string |string[];
  format?: string;
  subtype?: string;
  language?: string;
  border?: string;
  type?: string | string[];
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
