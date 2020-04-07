import { PlayerView, MatchView, SeasonView, ScryfallSetView, PlayerRoleView } from "./Views";

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
  content?: object | string;
  message?: string;
  statusCode?: number;
}

export interface LoginResponse {
  body: AuthResponse;
  headers: AuthHeaderResponse;
}

export interface MatchResponse extends MatchView {
  losers: string[] | PlayerView[];
  season: string | SeasonView;
  winners: string[] | PlayerView[];
}

export interface PlayerResponse extends PlayerView {
  [key: string]: string | string[] | number;
}

export interface PlayerRoleResponse extends PlayerRoleView {
  role: string;
}

export interface SeasonResponse extends SeasonView {
  players: string[] | PlayerView[];
  set: string | ScryfallSetView;
}

export interface SuccessResponse {
  message: string;
}

export interface UserResponse {
  accountType: string;
  displayName: string;
  email: string;
  firstName?: string;
  id: string;
  isFirstTimeLogin?: boolean;
  lastName?: string;
  userName: string;
}
