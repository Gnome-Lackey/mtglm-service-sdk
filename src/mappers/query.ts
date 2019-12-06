import { PlayerQueryParameters } from "../models/QueryParameters";
import { PlayerFilters } from "../models/Filters";

export const toPlayerFilters = (query: PlayerQueryParameters): PlayerFilters => {
  if (!query) {
    return null;
  }

  const { name, userName } = query;

  const filters = {} as PlayerFilters;

  if (query.name) {
    filters.playerName = name;
  }

  if (query.userName) {
    filters.userName = userName;
  }

  return filters;
};
