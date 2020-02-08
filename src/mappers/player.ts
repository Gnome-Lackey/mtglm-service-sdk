import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { PlayerView, PlayerRoleView, PlayerSeasonMetadataView } from "../models/Views";
import { PlayerNode, PlayerRoleNode, PlayerSeasonMetadataNode } from "../models/Nodes";
import { PlayerCreateRequest, PlayerUpdateRequest } from "../models/Requests";
import { PlayerDynamoCreateItem, PlayerDynamoUpdateItem } from "../models/Items";

export const toUpdateItem = (data: PlayerUpdateRequest): PlayerDynamoUpdateItem => ({
  playerName: data.name,
  userName: data.userName,
  totalMatchWins: data.totalWins,
  totalMatchLosses: data.totalLosses,
  email: data.email,
  favoriteColors: data.favoriteColors,
  epithet: data.epithet
});

export const toCreateItem = (data: PlayerCreateRequest): PlayerDynamoCreateItem => {
  const date = new Date().valueOf().toString();

  return {
    playerId: data.id,
    playerName: data.name,
    userName: data.userName,
    totalMatchWins: data.totalWins || 0,
    totalMatchLosses: data.totalLosses || 0,
    email: data.email,
    favoriteColors: data.favoriteColors,
    epithet: data.epithet,
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
  favoriteColors: data.favoriteColors as string[],
  epithet: data.epithet as string,
  updatedOn: data.updatedOn as string
});

export const toRoleNode = (data: AttributeMap): PlayerRoleNode => ({
  playerId: data.playerId as string,
  playerName: data.playerName as string,
  userName: data.userName as string,
  email: data.email as string,
  updatedOn: data.updatedOn as string
});

export const toSeasonMetadataNode = (data: AttributeMap): PlayerSeasonMetadataNode => ({
  playerSeasonMetaId: data.playerSeasonMetaId as string,
  playerId: data.playerId as string,
  seasonId: data.seasonId as string,
  playedOpponentIds: data.playedOpponentIds as string[],
  seasonWins: data.seasonWins as number,
  seasonLosses: data.seasonLosses as number,
  totalWins: data.totalWins as number,
  totalLosses: data.totalLosses as number,
  matchIds: data.matchIds as string[]
});

export const toView = (data: PlayerNode): PlayerView => ({
  id: data.playerId,
  email: data.email,
  userName: data.userName,
  displayName: data.playerName,
  colors: data.favoriteColors,
  epithet: data.epithet,
  totalLosses: data.totalMatchLosses,
  totalWins: data.totalMatchWins
});

export const toRoleView = (data: PlayerRoleNode): PlayerRoleView => ({
  id: data.playerId,
  email: data.email,
  userName: data.userName,
  displayName: data.playerName
});

export const toSeasonMetadataView = (data: PlayerSeasonMetadataNode): PlayerSeasonMetadataView => ({
  id: data.playerSeasonMetaId,
  seasonWins: data.seasonWins,
  seasonLosses: data.seasonLosses,
  totalWins: data.totalWins,
  totalLosses: data.totalLosses
});
