import { PlayerQueryParameters, SetQueryParameters } from "../models/QueryParameters";
import { PlayerFilters, SetFilters } from "../models/Filters";

export const toPlayerFilters = (query: PlayerQueryParameters): PlayerFilters => ({
  playerName: query.name,
  userName: query.userName
});

export const toSetFilters = (query: SetQueryParameters): SetFilters => ({
  setName: query.name
});
