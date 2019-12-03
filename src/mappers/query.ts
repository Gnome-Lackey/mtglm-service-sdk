import { PlayerQueryParameters, SetQueryParameters } from "../models/QueryParameters";
import { PlayerFilters, SetFilters } from "../models/Filters";

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

export const toSetFilters = (query: SetQueryParameters): SetFilters => {
  if (!query) {
    return null;
  }

  const { name } = query;

  const filters = {} as SetFilters;

  if (query.name) {
    filters.setName = name;
  }

  return filters;
};
