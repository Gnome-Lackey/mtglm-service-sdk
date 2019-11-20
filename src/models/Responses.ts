import { PlayerView, RecordView, MatchView, SeasonView } from "./Views";

export interface RecordResponse extends RecordView {
  player: string;
  match: string;
}

export interface RecordDetailsResponse extends RecordView {
  player: PlayerView;
  match: MatchView;
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

export interface SeasonResponse extends SeasonView {
  set: string;
  players: string[];
  matches: string[];
}

export interface SeasonDetailsResponse extends SeasonView {
  set: SetResponse;
  players: PlayerView[];
  matches: MatchView[];
}

export interface SetResponse {
  id: string;
  name: string;
  icon: string;
};

export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  code: "NotAuthorizedException" | "InvalidIdTokenException";
  message?: string;
  content?: object | string;
}
