export interface AuthNode {
  user: UserNode;
}

export interface MatchNode {
  matchId: string;
  seasonId: string;
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
  updatedOn: string;
}

export interface PlayerRoleNode {
  playerId: string;
  playerName: string;
  userName: string;
  email: string;
  updatedOn: string;
}

/*
  points: Total number of points from the result of a match (win: 3, loss: 0, draw: 1)
  omw: Opponent Match Win Percentage: Percentage of _matches_ a player's opponents won
*/
export interface PlayerStandingNode {
  id: string;
  points: number;
  omw: number;
  player: PlayerNode;
}

export interface RecordNode {
  recordId: string;
  wins: number;
  playerId: string;
  matchId: string;
  updatedOn: string;
}

export interface ScryfallCardNode {
  id: string;
  name: string;
  lang: string;
  released_at: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  mana_cost: string;
  cmc: number;
  type_line: string;
  colors: string[];
  color_identity: string[];
  foil: boolean;
  nonfoil: boolean;
  set: string;
  set_name: string;
  collector_number: string;
  rarity: string;
  artist_ids: string[];
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

export interface SeasonMetadataNode {
 seasonMetadataId: string;
  playerId: string;
  seasonId: string;
  playedOpponentIds: string[];
  seasonWins: number;
  seasonLosses: number;
  totalWins: number;
  totalLosses: number;
  matchIds: string[];
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
