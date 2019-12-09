import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { MatchUpdateRequest } from "../models/Requests";
import { MatchView } from "../models/Views";
import { MatchNode } from "../models/Nodes";
import { MatchDynamoCreateItem, MatchDynamoUpdateItem } from "../models/Items";

export function toCreateItem(): MatchDynamoCreateItem {
  const date = new Date().valueOf().toString();

  return {
    matchId: uuid.v4(),
    playerRecords: [],
    updatedOn: date
  };
}

export const toUpdateItem = (data: MatchUpdateRequest): MatchDynamoUpdateItem => ({
  playerRecords: (data.players || []).map((player) => player.id)
});

export const toNode = (data: AttributeMap): MatchNode => ({
  matchId: data.matchId as string,
  playerRecords: data.playerRecords as string[],
  updatedOn: data.updatedOn as string
});

export const toView = (data: MatchNode): MatchView => ({
  id: data.matchId
});
