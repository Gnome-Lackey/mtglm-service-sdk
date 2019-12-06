export interface PlayerQueryParameters {
  name?: string;
  userName?: string;
}

export interface PotentialQueryParameters
  extends PlayerQueryParameters {
  [key: string]: string;
}
