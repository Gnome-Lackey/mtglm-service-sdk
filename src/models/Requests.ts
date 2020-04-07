export interface ConfirmRegistrationBodyRequest {
  userName: string;
  verificationCode: string;
}

export interface LoginBodyRequest {
  password: string;
  userName: string;
}

export interface MatchCreateRequest {
  games: number;
  isSeasonPoint: boolean;
  losers: string[];
  season: string;
  winners: string[];
  wins: number;
}

export interface MatchUpdateRequest {
  games?: number;
  id?: string;
  isSeasonPoint?: boolean;
  losers?: string[];
  season?: string;
  winners?: string;
  wins?: number;
}

export interface PlayerCreateRequest {
  email: string;
  epithet?: string;
  favoriteColors?: string[];
  id: string;
  name: string;
  userName: string;
}

export interface PlayerUpdateRequest {
  email?: string;
  epithet?: string;
  favoriteColors?: string[];
  name?: string;
  userName?: string;
}

export interface PlayerUpdateRoleRequest {
  role: string;
}

export interface ResendConfirmationCodeBodyRequest {
  userName: string;
}

export interface SeasonCreateRequest {
  endedOn: string;
  isActive: boolean;
  players: string[];
  set: string;
  startedOn: string;
}

export interface SeasonUpdateRequest {
  endedOn?: string;
  isActive?: boolean;
  players?: string[];
  set?: string;
  startedOn?: string;
}

export interface SignUpBodyRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  userName: string;
}

export type PotentialRequest =
  | MatchCreateRequest
  | MatchUpdateRequest
  | PlayerCreateRequest
  | PlayerUpdateRequest
  | PlayerUpdateRoleRequest
  | SeasonCreateRequest
  | SeasonUpdateRequest
  | LoginBodyRequest
  | ConfirmRegistrationBodyRequest
  | ResendConfirmationCodeBodyRequest
  | SignUpBodyRequest;
