import { PlayerQueryParameters, SetQueryParameters } from "../models/QueryParameters";
import { PlayerFilters, SetFilters } from "../models/Filters";

export const toPlayerFilters = (query: PlayerQueryParameters): PlayerFilters => {
  if (!query) {
    return null;
  }

  return {
    playerName: query.name,
    userName: query.userName
  };
};

export const toSetFilters = (query: SetQueryParameters): SetFilters => {
  if (!query) {
    return null;
  }

  return {
    setName: query.name
  };
};
