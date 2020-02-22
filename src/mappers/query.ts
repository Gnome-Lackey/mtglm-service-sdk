import {
  MatchQueryParameters,
  PlayerQueryParameters,
  SeasonQueryParams
} from "../models/QueryParameters";

import { PlayerFilters, SeasonFilters, MatchFilters } from "../models/Filters";

export const toMatchFilters = (query: MatchQueryParameters): MatchFilters => {
  if (!query) {
    return null;
  }

  const { seasonId, playerId } = query;

  const filters = {} as MatchFilters;

  if (seasonId) {
    filters.seasonId = seasonId;
  }

  if (playerId) {
    filters.winnerIds = [playerId];
    filters.loserIds = [playerId];
  }

  return filters;
};

export const toPlayerFilters = (query: PlayerQueryParameters): PlayerFilters => {
  if (!query) {
    return null;
  }

  const { name, userName } = query;

  const filters = {} as PlayerFilters;

  if (name) {
    filters.playerName = name;
  }

  if (userName) {
    filters.userName = userName;
  }

  return filters;
};

export const toSeasonFilters = (query: SeasonQueryParams): SeasonFilters => {
  if (!query) {
    return null;
  }

  const { active } = query;

  const filters = {} as SeasonFilters;

  if (active) {
    filters.isActive = active.toLowerCase() === "true";
  }

  return filters;
};
