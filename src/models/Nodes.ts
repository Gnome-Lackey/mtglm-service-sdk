export interface AuthNode {
  user: UserNode;
}

export interface MatchNode {
  gamesPlayed: number;
  isSeasonPoint: boolean;
  loserIds: string[];
  matchId: string;
  seasonId: string;
  updatedOn: string;
  winnerIds: string[];
  wins: number;
}

export interface PlayerNode {
  email: string;
  epithet: string;
  favoriteColors: string[];
  playerId: string;
  playerName: string;
  updatedOn: string;
  userName: string;
}

export interface PlayerRoleNode {
  email: string;
  playerId: string;
  playerName: string;
  updatedOn: string;
  userName: string;
}

/*
  points: Total number of points from the result of a match (win: 3, loss: 0, draw: 1)
  omw: Opponent Match Win Percentage: Percentage of _matches_ a player's opponents won
*/
export interface PlayerStandingNode {
  id: string;
  omw: number;
  player: PlayerNode;
  points: number;
}

export interface ScryfallCardNode {
  artist_ids: string[];
  cmc: number;
  collector_number: string;
  colors: string[];
  color_identity: string[];
  foil: boolean;
  id: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  lang: string;
  mana_cost: string;
  name: string;
  nonfoil: boolean;
  rarity: string;
  released_at: string;
  set: string;
  set_name: string;
  type_line: string;
}

export interface ScryfallSetNode {
  card_count: number;
  code: string;
  id: string;
  name: string;
  released_at: string;
}

export interface SeasonNode {
  endDate: string;
  isActive: boolean;
  playerIds: string[];
  seasonId: string;
  setCode: string;
  startDate: string;
  updatedOn: string;
}

export interface SignUpNode {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  userName: string;
}

export interface TokensNode {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export interface UserNode {
  email: string;
  firstName?: string;
  id: string;
  isFirstTimeLogin: boolean;
  lastName?: string;
  name: string;
  role: string;
  userName: string;
}
