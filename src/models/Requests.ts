export interface ConfirmRegistrationBodyRequest {
  userName: string;
  verificationCode: string;
}

export interface LoginBodyRequest {
  userName: string;
  password: string;
}

export interface MatchCreateRequest {
  players: RecordCreateRequest[];
}

export interface MatchUpdateRequest {
  id?: string;
  players?: RecordUpdateRequest[];
}

export interface PlayerCreateRequest {
  id: string;
  name: string;
  userName: string;
  email: string;
  totalWins?: number;
  totalLosses?: number;
  epithet?: string;
  favoriteColors?: string[];
  matches: string[];
}

export interface PlayerUpdateRequest {
  name?: string;
  userName?: string;
  email?: string;
  totalWins?: number;
  totalLosses?: number;
  epithet?: string;
  favoriteColors?: string[];
  matches?: string[];
}

export interface RecordCreateRequest {
  wins: number;
  player: string;
}

export interface RecordUpdateRequest {
  id?: string;
  wins?: number;
  player?: string;
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
  matches: string[];
}

export interface SeasonUpdateRequest {
  isActive?: boolean;
  startedOn?: string;
  endedOn?: string;
  set?: string;
  players?: string[];
  matches?: string[];
}

export interface SignUpBodyRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}

export type PotentialRequest =
  | RecordCreateRequest
  | RecordUpdateRequest
  | MatchCreateRequest
  | MatchUpdateRequest
  | SeasonCreateRequest
  | SeasonUpdateRequest
  | LoginBodyRequest
  | ConfirmRegistrationBodyRequest
  | ResendConfirmationCodeBodyRequest
  | SignUpBodyRequest;
