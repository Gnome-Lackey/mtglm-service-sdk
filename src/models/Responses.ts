import { PlayerView, RecordView, MatchView, SeasonView } from "./Views";

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
}

export interface LoginResponse {
  body: AuthResponse;
  headers: AuthHeaderResponse;
}

export interface MatchResponse extends MatchView {
  playerARecord: RecordResponse;
  playerBRecord: RecordResponse;
}

export interface MatchDetailsResponse extends MatchView {
  playerARecord: RecordDetailsResponse;
  playerBRecord: RecordDetailsResponse;
}

export interface PlayerResponse extends PlayerView {
  matches: string[];
}

export interface PlayerDetailsResponse extends PlayerView {
  matches: MatchView[];
}

export interface RecordResponse extends RecordView {
  losses: number;
  player: string;
  match: string;
}

export interface RecordDetailsResponse extends RecordView {
  losses: number;
  player: PlayerView;
  match: MatchView;
}

export interface SeasonResponse extends SeasonView {
  players: string[];
  matches: string[];
}

export interface SeasonDetailsResponse extends SeasonView {
  players: PlayerView[];
  matches: MatchView[];
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
