export interface PlayerQueryParameters {
  name?: string;
  userName?: string;
}

export interface SetQueryParameters {
  name?: string;
}

export interface PotentialQueryParameters
  extends PlayerQueryParameters,
    SetQueryParameters {
  [key: string]: string;
}
