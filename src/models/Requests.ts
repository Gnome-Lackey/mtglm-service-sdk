export interface ConfirmRegistrationBodyRequest {
  userName: string;
  verificationCode: string;
}

export interface LoginBodyRequest {
  userName: string;
  password: string;
}

export interface MatchCreateRequest {
  playerA: RecordCreateRequest;
  playerB: RecordCreateRequest;
}

export interface MatchUpdateRequest {
  playerA?: RecordUpdateRequest;
  playerB?: RecordUpdateRequest;
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
  losses: number;
  player: string;
  match: string;
}

export interface RecordUpdateRequest {
  wins?: number;
  losses?: number;
  player?: string;
}

export interface ResendConfirmationCodeBodyRequest {
  userName: string;
}

export interface SeasonCreateRequest {
  isActive: boolean;
  startDate: string;
  endDate: string;
  set: string;
  players: string[];
  matches: string[];
}

export interface SeasonUpdateRequest {
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  set?: string;
  players?: string[];
  matches?: string[];
}

export interface SetCreateRequest {
  name: string;
  icon: string;
}

export interface SetUpdateRequest {
  name?: string;
  icon?: string;
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
  | SetCreateRequest
  | SetUpdateRequest
  | LoginBodyRequest
  | ConfirmRegistrationBodyRequest
  | ResendConfirmationCodeBodyRequest
  | SignUpBodyRequest;
