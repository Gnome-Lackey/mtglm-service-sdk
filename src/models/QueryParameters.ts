export interface MatchQueryParameters {
  winners?: string | string[];
  "winners|"?: string | string[];
  losers?: string | string[];
  "losers|"?: string | string[];
  season?: string;
  "season|"?: string;
  seasonPoint?: string;
  "seasonPoint|"?: string;
}

export interface PlayerQueryParameters {
  name?: string;
  "name|"?: string;
  season?: string;
  "season|"?: string;
  userName?: string;
  "userName|"?: string;
}

export interface ScryfallCardQueryParameters {
  [key: string]: number | string | string[];
  colors?: string | string[];
  format?: string;
  subtype?: string;
  language?: string;
  border?: string;
  type?: string | string[];
}

export interface SeasonQueryParams {
  active?: string;
  "active|"?: string;
}

export interface PotentialQueryParameters
  extends PlayerQueryParameters,
    ScryfallCardQueryParameters,
    MatchQueryParameters,
    SeasonQueryParams {
  [key: string]: string | string[] | number;
}
