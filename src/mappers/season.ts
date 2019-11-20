import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { SeasonCreateRequest, SeasonUpdateRequest } from "../models/Requests";
import { SeasonView } from "../models/Views";
import { SeasonNode } from "../models/Nodes";
import { SeasonDynamoItem } from "../models/Items";

export function toItem(data: SeasonCreateRequest): SeasonDynamoItem;
export function toItem(data: SeasonUpdateRequest): SeasonDynamoItem;
export function toItem(data: any): SeasonDynamoItem {
  const date = new Date().valueOf().toString();

  return {
    seasonId: uuid.v4(),
    isActive: data.isActive,
    startDate: data.startDate,
    endDate: data.endDate,
    setId: data.set,
    playerIds: data.players,
    matchIds: data.matches,
    updatedOn: date
  };
}

export const toNode = (data: AttributeMap): SeasonNode => ({
  seasonId: data.seasonId as string,
  isActive: data.isActive as boolean,
  startDate: data.startDate as string,
  endDate: data.endDate as string,
  setId: data.setId as string,
  playerIds: data.playerIds as string[],
  matchIds: data.matchIds as string[],
  updatedOn: data.updatedOn as string,
});

export const toView = (data: SeasonNode): SeasonView => ({
  id: data.seasonId,
  isActive: data.isActive,
  startDate: data.startDate,
  endDate: data.endDate
});
