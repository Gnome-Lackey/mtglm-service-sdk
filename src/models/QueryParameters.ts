export interface PlayerQueryParameters {
  displayName?: string;
  userName?: string;
}

export interface SeasonQueryParameters {
  setId?: string;
}

export interface SetQueryParameters {
  name?: string;
}

export interface PotentialQueryParameters
  extends PlayerQueryParameters,
    SeasonQueryParameters,
    SetQueryParameters {
  [key: string]: string;
}
