export interface ConfirmRegistrationBodyRequest {
  userName: string;
  verificationCode: string;
}

export interface LoginBodyRequest {
  userName: string;
  password: string;
}

export interface MatchCreateRequest {
  isSeasonPoint: boolean;
  wins: number;
  games: number;
  winner: string;
  losers: string[];
  season: string;
}

export interface MatchUpdateRequest {
  id?: string;
  isSeasonPoint?: boolean;
  wins?: number;
  games?: number;
  winner?: string;
  losers?: string[];
  season?: string;
}

export interface PlayerCreateRequest {
  id: string;
  name: string;
  userName: string;
  email: string;
  epithet?: string;
  favoriteColors?: string[];
}

export interface PlayerUpdateRequest {
  name?: string;
  userName?: string;
  email?: string;
  epithet?: string;
  favoriteColors?: string[];
}

export interface PlayerUpdateRoleRequest {
  role: string;
}

export interface ResendConfirmationCodeBodyRequest {
  userName: string;
}

export interface SeasonCreateRequest {
  isActive: boolean;
  startedOn: string;
  endedOn: string;
  set: string;
  players: string[];
}

export interface SeasonUpdateRequest {
  isActive?: boolean;
  startedOn?: string;
  endedOn?: string;
  set?: string;
  players?: string[];
}

export interface SignUpBodyRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
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
