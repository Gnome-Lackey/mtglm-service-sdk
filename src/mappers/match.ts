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
    playerARecordId: "",
    playerBRecordId: "",
    updatedOn: date
  };
}

export const toUpdateItem = (data: MatchUpdateRequest): MatchDynamoUpdateItem => ({
  playerARecordId: data.playerA.id,
  playerBRecordId: data.playerB.id
});

export const toNode = (data: AttributeMap): MatchNode => ({
  matchId: data.matchId as string,
  playerARecordId: data.playerARecordId as string,
  playerBRecordId: data.playerBRecordId as string,
  updatedOn: data.updatedOn as string
});

export const toView = (data: MatchNode): MatchView => ({
  id: data.matchId
});
