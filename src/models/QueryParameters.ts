export interface PlayerQueryParameters {
  name?: string;
  userName?: string;
  season?: string;
}

export interface ScryfallCardQueryParameters {
  color: string[];
  type: string[];
  subtype: string;
  format: string;
}

export interface SeasonQueryParams {
  active?: string;
}

export interface PotentialQueryParameters
  extends PlayerQueryParameters,
    ScryfallCardQueryParameters,
    SeasonQueryParams {
  [key: string]: string | string[] | boolean | number;
}
