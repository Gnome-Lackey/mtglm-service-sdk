import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { MatchUpdateRequest, MatchCreateRequest } from "../models/Requests";
import { MatchView } from "../models/Views";
import { MatchNode } from "../models/Nodes";
import { MatchDynamoCreateItem, MatchDynamoUpdateItem } from "../models/Items";
import { MatchQueryParameters } from "../models/QueryParameters";
import { MatchFilters } from "../models/Filters";

export function toCreateItem(details: MatchCreateRequest): MatchDynamoCreateItem {
  const date = new Date().valueOf().toString();

  return {
    matchId: uuid.v4(),
    seasonId: details.season,
    gamesPlayed: details.games,
    isSeasonPoint: details.isSeasonPoint,
    loserIds: details.losers,
    winnerIds: details.winners,
    wins: details.wins,
    updatedOn: date
  };
}

export const toUpdateItem = (data: MatchUpdateRequest): MatchDynamoUpdateItem => ({
  isSeasonPoint: data.isSeasonPoint,
  gamesPlayed: data.games,
  loserIds: data.losers,
  winnerIds: data.winners,
  wins: data.wins
});

export const toNode = (data: AttributeMap): MatchNode => ({
  matchId: data.matchId as string,
  isSeasonPoint: data.isSeasonPoint as boolean,
  seasonId: data.seasonId as string,
  gamesPlayed: data.gamesPlayed as number,
  loserIds: data.loserIds as string[],
  winnerIds: data.winnerIds as string[],
  wins: data.wins as number,
  updatedOn: data.updatedOn as string
});

export const toView = (data: MatchNode): MatchView => ({
  id: data.matchId,
  isSeasonPoint: data.isSeasonPoint,
  games: data.gamesPlayed,
  wins: data.wins
});

export const toFilters = (queryParams: MatchQueryParameters): MatchFilters => ({
  winnerIds: queryParams.winners,
  "winnerIds|": queryParams["winners|"],
  loserIds: queryParams.losers,
  "loserIds|": queryParams["losers|"],
  seasonId: queryParams.season,
  "seasonId|": queryParams["season|"],
  isSeasonPoint: queryParams.seasonPoint,
  "isSeasonPoint|": queryParams["seasonPoint|"]
});
