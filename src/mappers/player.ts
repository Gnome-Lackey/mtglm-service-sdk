import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { PlayerCreateRequest, PlayerUpdateRequest } from "../models/Requests";
import { PlayerView } from "../models/Views";
import { PlayerNode } from "../models/Nodes";
import { PlayerDynamoItem } from "../models/Items";

export function toItem(data: PlayerCreateRequest): PlayerDynamoItem;
export function toItem(data: PlayerUpdateRequest): PlayerDynamoItem;
export function toItem(data: any): PlayerDynamoItem {
  const date = new Date().valueOf().toString();

  return {
    playerId: uuid.v4(),
    playerName: data.name,
    totalMatchLosses: data.totalMatchLosses,
    totalMatchWins: data.totalMatchWins,
    matchIds: data.matchIds,
    updatedOn: date
  };
}

export const toNode = (data: AttributeMap): PlayerNode => ({
  playerId: data.playerId as string,
  playerName: data.playerName as string,
  totalMatchLosses: data.totalMatchLosses as number,
  totalMatchWins: data.totalMatchWins as number,
  matchIds: data.matchIds as string[],
  updatedOn: data.updatedOn as string
});

export const toView = (data: PlayerNode): PlayerView => ({
  id: data.playerId,
  name: data.playerName,
  totalWins: data.totalMatchWins,
  totalLosses: data.totalMatchLosses
});
