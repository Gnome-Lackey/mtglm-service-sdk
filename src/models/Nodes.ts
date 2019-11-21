export interface RecordNode {
  recordId: string;
  wins: number;
  losses: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
}

export interface MatchNode {
  matchId: string;
  playerARecordId: string;
  playerBRecordId: string;
  updatedOn: string;
}

export interface PlayerNode {
  id: string;
  userName: string;
  name: string;
  totalWins: number;
  totalLosses: number;
  email: string;
  isFirstTimeLogin: boolean;
  role: string;
}

export interface SeasonNode {
  seasonId: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  setId: string;
  playerIds: string[];
  matchIds: string[];
  updatedOn: string;
}

export interface SetNode {
  setId: string;
  setName: string;
  icon: string;
  updatedOn: string;
}

export interface TokensNode {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export interface AuthNode {
  user: PlayerNode;
  tokens: TokensNode;
}

export interface SignUpNode {
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
}
