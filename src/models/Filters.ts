export interface MatchFilters {
  winnerIds?: string | string[];
  "winnerIds|"?: string | string[];
  loserIds?: string | string[];
  "loserIds|"?: string | string[];
  seasonId?: string;
  "seasonId|"?: string;
  isSeasonPoint?: boolean;
  "isSeasonPoint|"?: boolean;
}

export interface PlayerFilters {
  displayName?: string;
  "displayName|"?: string;
  seasonId?: string;
  "seasonId|"?: string;
  userName?: string;
  "userName|"?: string;
}

export interface ScryfallCardFilters {
  colors?: string | string[];
  format?: string;
  subtype?: string;
  language?: string;
  border?: string;
  type?: string | string[];
}

export interface SeasonFilters {
  seasonId?: string;
  "seasonId|"?: string;
  isActive?: boolean;
  "isActive|"?: boolean;
}
