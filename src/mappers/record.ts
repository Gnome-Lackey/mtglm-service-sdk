import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { MatchCreateRequest, MatchUpdateRequest } from "../models/Requests";
import { MatchView } from "../models/Views";
import { MatchNode } from "../models/Nodes";
import { MatchDynamoItem } from "../models/Items";

export function toItem(data: MatchCreateRequest): MatchDynamoItem;
export function toItem(data: MatchUpdateRequest): MatchDynamoItem;
export function toItem(data: any): MatchDynamoItem {
  const date = new Date().valueOf().toString();

  return {
    matchId: uuid.v4(),
    playerARecordId: data.playerA.id,
    playerBRecordId: data.playerA.id,
    updatedOn: date
  };
}

export const toNode = (data: AttributeMap): MatchNode => ({
  matchId: data.matchId as string,
  playerARecordId: data.playerARecordId as string,
  playerBRecordId: data.playerBRecordId as string,
  updatedOn: data.updatedOn as string,
});

export const toView = (data: MatchNode): MatchView => ({
  id: data.matchId
});
