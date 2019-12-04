import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { RecordCreateRequest, RecordUpdateRequest } from "../models/Requests";
import { RecordView } from "../models/Views";
import { RecordNode } from "../models/Nodes";
import { RecordDynamoCreateItem, RecordDynamoUpdateItem } from "../models/Items";

export function toCreateItem(matchId: string, data: RecordCreateRequest): RecordDynamoCreateItem {
  const date = new Date().valueOf().toString();

  return {
    recordId: uuid.v4(),
    matchId,
    wins: data.wins,
    losses: data.losses,
    playerId: data.player,
    updatedOn: date
  };
}

export const toItem = (data: RecordUpdateRequest): RecordDynamoUpdateItem => ({
  wins: data.wins,
  losses: data.losses
});

export const toNode = (data: AttributeMap): RecordNode => ({
  recordId: data.recordId as string,
  wins: data.wins as number,
  losses: data.losses as number,
  playerId: data.playerId as string,
  matchId: data.matchId as string,
  updatedOn: data.updatedOn as string
});

export const toView = (data: RecordNode): RecordView => ({
  id: data.recordId,
  wins: data.wins,
  losses: data.losses
});
