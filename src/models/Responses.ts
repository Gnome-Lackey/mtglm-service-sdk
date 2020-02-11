import {
  PlayerView,
  RecordView,
  MatchView,
  SeasonView,
  ScryfallSetView,
  PlayerRoleView,
  SeasonMetadataView
} from "./Views";

export interface AuthHeaderResponse {
  "X-ID-Token": string;
  "X-Access-Token": string;
  "set-cookie": string;
  "Access-Control-Expose-Headers": string;
}

export interface AuthResponse {
  user: UserResponse;
}

export interface ErrorResponse {
  code:
    | "AccountConflictException"
    | "AliasExistsException"
    | "CodeMismatchException"
    | "ExpiredCodeException"
    | "InvalidIdTokenException"
    | "InvalidPasswordException"
    | "InvalidParameterException"
    | "InvalidTokenException"
    | "MissingTokenException"
    | "NotAuthorizedException"
    | "UsernameExistsException"
    | "UserNotConfirmedException"
    | "UserNotFoundException";
  message?: string;
  content?: object | string;
  statusCode?: number;
}

export interface LoginResponse {
  body: AuthResponse;
  headers: AuthHeaderResponse;
}

export interface MatchResponse extends MatchView {
  players?: RecordResponse[];
  season: string | SeasonView;
}

export interface PlayerResponse extends PlayerView {
  [key: string]: string | string[] | number;
}

export interface PlayerRoleResponse extends PlayerRoleView {
  role: string;
}

export interface RecordResponse extends RecordView {
  losses: number;
  player: string | PlayerView;
  match: string | MatchView;
}

export interface SeasonResponse extends SeasonView {
  set: string | ScryfallSetView;
  players: string[] | PlayerView[];
}

export interface SeasonMetadataResponse extends SeasonMetadataView {
  player: string | PlayerView;
  season: string | SeasonView;
  playedOpponents: string[] | PlayerView[];
  matches: string[] | MatchView[];
}

export interface SuccessResponse {
  message: string;
}

export interface UserResponse {
  id: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  displayName: string;
  isFirstTimeLogin?: boolean;
  accountType: string;
}
