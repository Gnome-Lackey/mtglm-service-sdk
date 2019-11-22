import * as uuid from "uuid";

import { PlayerView } from "../models/Views";
import { PlayerNode } from "../models/Nodes";
import { PlayerCreateRequest, PlayerUpdateRequest } from "src/models/Requests";

export function toNode(data: PlayerCreateRequest): PlayerNode;
export function toNode(data: PlayerUpdateRequest): PlayerNode;
export function toNode(data: any): PlayerNode {
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

export const toView = (data: PlayerNode): PlayerView => ({
  id: data.playerId,
  email: data.email,
  userName: data.userName,
  displayName: data.playerName,
  totalLosses: data.totalMatchLosses,
  totalWins: data.totalMatchWins
});
