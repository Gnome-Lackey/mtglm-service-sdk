export interface AuthNode {
  user: UserNode;
}

export interface MatchNode {
  matchId: string;
  playerARecordId: string;
  playerBRecordId: string;
  updatedOn: string;
}

export interface PlayerNode {
  playerId: string;
  playerName: string;
  userName: string;
  totalMatchWins: number;
  totalMatchLosses: number;
  email: string;
  updatedOn: string;
}

export interface RecordNode {
  recordId: string;
  wins: number;
  losses: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
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
  isFirstTimeLogin: boolean;
  role: string;
}
