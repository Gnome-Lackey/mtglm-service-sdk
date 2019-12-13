export interface AuthNode {
  user: UserNode;
}

export interface MatchNode {
  matchId: string;
  playerRecords: string[];
  updatedOn: string;
}

export interface PlayerNode {
  playerId: string;
  playerName: string;
  userName: string;
  totalMatchWins: number;
  totalMatchLosses: number;
  email: string;
  epithet: string;
  favoriteColors: string[];
  matchIds: string[];
  updatedOn: string;
}

export interface RecordNode {
  recordId: string;
  wins: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
}

export interface ScryfallSetNode {
  id: string;
  name: string;
  released_at: string;
  card_count: number;
  code: string;
}

export interface SeasonNode {
  seasonId: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  setCode: string;
  playerIds: string[];
  updatedOn: string;
}

export interface SignUpNode {
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}

export interface TokensNode {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export interface UserNode {
  id: string;
  userName: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  isFirstTimeLogin: boolean;
  role: string;
}
