import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { SeasonCreateRequest, SeasonUpdateRequest } from "../models/Requests";
import { SeasonView } from "../models/Views";
import { SeasonNode } from "../models/Nodes";
import { SeasonDynamoCreateItem, SeasonDynamoUpdateItem } from "../models/Items";

export function toCreateItem(data: SeasonCreateRequest): SeasonDynamoCreateItem {
  const date = new Date().valueOf().toString();

  return {
    seasonId: uuid.v4(),
    isActive: data.isActive,
    startDate: data.startedOn,
    endDate: data.endedOn,
    setId: data.set,
    playerIds: data.players,
    matchIds: data.matches,
    updatedOn: date
  };
}

export const toUpdateItem = (data: SeasonUpdateRequest): SeasonDynamoUpdateItem => ({
  isActive: data.isActive,
  endDate: data.endedOn,
  setId: data.set,
  playerIds: data.players,
  matchIds: data.matches
});

export const toNode = (data: AttributeMap): SeasonNode => ({
  seasonId: data.seasonId as string,
  isActive: data.isActive as boolean,
  startDate: data.startDate as string,
  endDate: data.endDate as string,
  setId: data.setId as string,
  playerIds: data.playerIds as string[],
  matchIds: data.matchIds as string[],
  updatedOn: data.updatedOn as string
});

export const toView = (data: SeasonNode): SeasonView => ({
  id: data.seasonId,
  isActive: data.isActive,
  set: data.setId,
  startedOn: data.startDate,
  endedOn: data.endDate
});
