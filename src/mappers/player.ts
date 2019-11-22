import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { PlayerView } from "../models/Views";
import { PlayerNode } from "../models/Nodes";
import { PlayerCreateRequest, PlayerUpdateRequest } from "src/models/Requests";

export function toItem(data: PlayerCreateRequest): PlayerNode;
export function toItem(data: PlayerUpdateRequest): PlayerNode;
export function toItem(data: any): PlayerNode {
  const date = new Date().valueOf().toString();

  return {
    playerId: uuid.v4(),
    playerName: data.name,
    userName: data.userName,
    totalMatchWins: data.totalWins,
    totalMatchLosses: data.totalLosses,
    email: data.email,
    updatedOn: date
  };
}

export const toNode = (data: AttributeMap): PlayerNode => ({
  playerId: data.playerId as string,
  playerName: data.playerName as string,
  userName: data.userName as string,
  totalMatchWins: data.totalMatchWins as number,
  totalMatchLosses: data.totalMatchLosses as number,
  email: data.email as string,
  updatedOn: data.updatedOn as string
});

export const toView = (data: PlayerNode): PlayerView => ({
  id: data.playerId,
  email: data.email,
  userName: data.userName,
  displayName: data.playerName,
  totalLosses: data.totalMatchLosses,
  totalWins: data.totalMatchWins
});
