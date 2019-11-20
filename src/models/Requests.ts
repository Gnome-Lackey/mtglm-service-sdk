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

export interface MatchCreateRequest {
  playerA: RecordCreateRequest;
  playerB: RecordCreateRequest;
}

export interface MatchUpdateRequest {
  playerA?: RecordUpdateRequest;
  playerB?: RecordUpdateRequest;
}

export interface PlayerCreateRequest {
  name: string;
  totalWins: number;
  totalLosses: number;
}

export interface PlayerUpdateRequest {
  name?: string;
  totalWins?: number;
  totalLosses?: number;
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

export type PotentialRequest =
  | RecordCreateRequest
  | RecordUpdateRequest
  | MatchCreateRequest
  | MatchUpdateRequest
  | PlayerCreateRequest
  | PlayerUpdateRequest
  | SeasonCreateRequest
  | SeasonUpdateRequest
  | SetCreateRequest
  | SetUpdateRequest;
