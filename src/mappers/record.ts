import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { RecordCreateRequest, RecordUpdateRequest } from "../models/Requests";
import { RecordView } from "../models/Views";
import { RecordNode } from "../models/Nodes";
import { RecordDynamoItem } from "../models/Items";

export function toCreateItem(data: RecordCreateRequest): RecordDynamoItem {
  const date = new Date().valueOf().toString();

  return {
    recordId: uuid.v4(),
    wins: data.wins,
    losses: data.losses,
    playerId: data.player,
    matchId: data.match,
    updatedOn: date
  };
}

export function toItem(data: RecordUpdateRequest): RecordDynamoItem {
  return {
    recordId: data.id,
    wins: data.wins,
    losses: data.losses,
    playerId: data.player
  };
}

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
  player: data.playerId,
  wins: data.wins,
  losses: data.losses
});
