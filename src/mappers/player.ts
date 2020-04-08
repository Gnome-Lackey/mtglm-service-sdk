import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { PlayerView, PlayerRoleView } from "../models/Views";
import { PlayerNode, PlayerRoleNode } from "../models/Nodes";
import { PlayerCreateRequest, PlayerUpdateRequest } from "../models/Requests";
import { PlayerDynamoCreateItem, PlayerDynamoUpdateItem } from "../models/Items";
import { PlayerQueryParameters } from "../models/QueryParameters";
import { PlayerFilters } from "../models/Filters";

export default class PlayerMapper {
  toUpdateItem = (data: PlayerUpdateRequest): PlayerDynamoUpdateItem => ({
    playerName: data.name,
    userName: data.userName,
    email: data.email,
    favoriteColors: data.favoriteColors,
    epithet: data.epithet
  });

  toCreateItem = (data: PlayerCreateRequest): PlayerDynamoCreateItem => {
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

  toNode = (data: AttributeMap): PlayerNode => ({
    playerId: data.playerId as string,
    playerName: data.playerName as string,
    userName: data.userName as string,
    email: data.email as string,
    favoriteColors: data.favoriteColors as string[],
    epithet: data.epithet as string,
    updatedOn: data.updatedOn as string
  });

  toRoleNode = (data: AttributeMap): PlayerRoleNode => ({
    playerId: data.playerId as string,
    playerName: data.playerName as string,
    userName: data.userName as string,
    email: data.email as string,
    updatedOn: data.updatedOn as string
  });

  toView = (data: PlayerNode): PlayerView => ({
    id: data.playerId,
    email: data.email,
    userName: data.userName,
    displayName: data.playerName,
    colors: data.favoriteColors,
    epithet: data.epithet
  });

  toRoleView = (data: PlayerRoleNode): PlayerRoleView => ({
    id: data.playerId,
    email: data.email,
    userName: data.userName,
    displayName: data.playerName
  });

  toFilters = (queryParams: PlayerQueryParameters): PlayerFilters => {
    const filters: PlayerFilters = {};

    if (queryParams.name) {
      filters.playerName = queryParams.name;
    } else if (queryParams["name|"]) {
      filters["playerName|"] = queryParams["name|"];
    }

    if (queryParams.userName) {
      filters.userName = queryParams.userName;
    } else if (queryParams["userName|"]) {
      filters["userName|"] = queryParams["userName|"];
    }

    return filters;
  };
}
