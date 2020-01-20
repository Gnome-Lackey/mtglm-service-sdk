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
    playerRecords: [],
    updatedOn: date
  };
}

export const toUpdateItem = (data: MatchUpdateRequest): MatchDynamoUpdateItem => ({
  seasonId: data.season,
  playerRecords: (data.records || []).map((record) => record.id)
});

export const toNode = (data: AttributeMap): MatchNode => ({
  matchId: data.matchId as string,
  seasonId: data.seasonId as string,
  playerRecords: data.playerRecords as string[],
  updatedOn: data.updatedOn as string
});

export const toView = (data: MatchNode): MatchView => ({
  id: data.matchId
});
