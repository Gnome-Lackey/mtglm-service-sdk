import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { PlayerView } from "../models/Views";
import { PlayerNode } from "../models/Nodes";
import { PlayerCreateRequest, PlayerUpdateRequest } from "../models/Requests";
import { PlayerDynamoItem } from "../models/Items";

export const toUpdateItem = (data: PlayerUpdateRequest): PlayerDynamoItem => {
  const date = new Date().valueOf().toString();

  return {
    playerName: data.name,
    userName: data.userName,
    totalMatchWins: data.totalWins,
    totalMatchLosses: data.totalLosses,
    email: data.email,
    matchIds: data.matches,
    updatedOn: date
  };
};

export const toCreateItem = (data: PlayerCreateRequest): PlayerDynamoItem => {
  const date = new Date().valueOf().toString();

  return {
    playerId: data.id,
    playerName: data.name,
    userName: data.userName,
    totalMatchWins: data.totalWins || 0,
    totalMatchLosses: data.totalLosses || 0,
    email: data.email,
    matchIds: data.matches,
    updatedOn: date
  };
};

export const toNode = (data: AttributeMap): PlayerNode => ({
  playerId: data.playerId as string,
  playerName: data.playerName as string,
  userName: data.userName as string,
  totalMatchWins: data.totalMatchWins as number,
  totalMatchLosses: data.totalMatchLosses as number,
  email: data.email as string,
  matchIds: data.matchIds as string[],
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
