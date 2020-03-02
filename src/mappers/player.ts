import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { PlayerView, PlayerRoleView } from "../models/Views";
import { PlayerNode, PlayerRoleNode } from "../models/Nodes";
import { PlayerCreateRequest, PlayerUpdateRequest } from "../models/Requests";
import { PlayerDynamoCreateItem, PlayerDynamoUpdateItem } from "../models/Items";
import { PlayerQueryParameters } from "../models/QueryParameters";
import { PlayerFilters } from "../models/Filters";

export const toUpdateItem = (data: PlayerUpdateRequest): PlayerDynamoUpdateItem => ({
  playerName: data.name,
  userName: data.userName,
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

export const toView = (data: PlayerNode): PlayerView => ({
  id: data.playerId,
  email: data.email,
  userName: data.userName,
  displayName: data.playerName,
  colors: data.favoriteColors,
  epithet: data.epithet
});

export const toRoleView = (data: PlayerRoleNode): PlayerRoleView => ({
  id: data.playerId,
  email: data.email,
  userName: data.userName,
  displayName: data.playerName
});

export const toFilters = (queryParams: PlayerQueryParameters): PlayerFilters => ({
  displayName: queryParams.name,
  "*displayName": queryParams["*name"],
  season: queryParams.season,
  "*season": queryParams["*season"],
  userName: queryParams.userName,
  "*userName": queryParams["*userName"]
});
