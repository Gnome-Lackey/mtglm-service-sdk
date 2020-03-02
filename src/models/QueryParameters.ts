export interface MatchQueryParameters {
  winners?: string | string[];
  "*winners"?: string | string[];
  losers?: string | string[];
  "*losers"?: string | string[];
  season?: string;
  "*season"?: string;
  seasonPoint?: boolean;
  "*seasonPoint"?: boolean;
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
  [key: string]: number | boolean | string | string[];
  colors?: string | string[];
  format?: string;
  subtype?: string;
  language?: string;
  border?: string;
  type?: string | string[];
}

export interface SeasonQueryParams {
  season?: string;
  "*season"?: string;
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
