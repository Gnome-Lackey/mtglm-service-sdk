import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { MatchUpdateRequest, MatchCreateRequest } from "../models/Requests";
import { MatchView } from "../models/Views";
import { MatchNode } from "../models/Nodes";
import { MatchDynamoCreateItem, MatchDynamoUpdateItem } from "../models/Items";

export function toCreateItem(details: MatchCreateRequest): MatchDynamoCreateItem {
  const date = new Date().valueOf().toString();

  return {
    matchId: uuid.v4(),
    seasonId: details.season,
    gamesPlayed: details.games,
    isSeasonPoint: details.isSeasonPoint,
    loserIds: details.losers,
    winnerId: details.winner,
    wins: details.wins,
    updatedOn: date
  };
}

export const toUpdateItem = (data: MatchUpdateRequest): MatchDynamoUpdateItem => ({
  isSeasonPoint: data.isSeasonPoint,
  gamesPlayed: data.games,
  loserIds: data.losers,
  winnerId: data.winner,
  wins: data.wins
});

export const toNode = (data: AttributeMap): MatchNode => ({
  matchId: data.matchId as string,
  isSeasonPoint: data.isSeasonPoint as boolean,
  seasonId: data.seasonId as string,
  gamesPlayed: data.gamesPlayed as number,
  loserIds: data.loserIds as string[],
  winnerId: data.winnerId as string,
  wins: data.wins as number,
  updatedOn: data.updatedOn as string
});

export const toView = (data: MatchNode): MatchView => ({
  id: data.matchId,
  isSeasonPoint: data.isSeasonPoint,
  games: data.gamesPlayed,
  wins: data.wins
});
