import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { SeasonCreateRequest, SeasonUpdateRequest } from "../models/Requests";
import { SeasonView } from "../models/Views";
import { SeasonNode } from "../models/Nodes";
import { SeasonDynamoCreateItem, SeasonDynamoUpdateItem } from "../models/Items";
import { SeasonQueryParams } from "../models/QueryParameters";
import { SeasonFilters } from "../models/Filters";

export function toCreateItem(data: SeasonCreateRequest): SeasonDynamoCreateItem {
  const date = new Date().valueOf().toString();

  return {
    seasonId: uuid.v4(),
    isActive: data.isActive,
    startDate: data.startedOn,
    endDate: data.endedOn,
    setCode: data.set,
    playerIds: data.players,
    updatedOn: date
  };
}

export const toUpdateItem = (data: SeasonUpdateRequest): SeasonDynamoUpdateItem => ({
  isActive: data.isActive,
  endDate: data.endedOn,
  setCode: data.set,
  playerIds: data.players
});

export const toNode = (data: AttributeMap): SeasonNode => ({
  seasonId: data.seasonId as string,
  isActive: data.isActive as boolean,
  startDate: data.startDate as string,
  endDate: data.endDate as string,
  setCode: data.setCode as string,
  playerIds: data.playerIds as string[],
  updatedOn: data.updatedOn as string
});

export const toView = (data: SeasonNode): SeasonView => ({
  id: data.seasonId,
  isActive: data.isActive,
  startedOn: data.startDate,
  endedOn: data.endDate
});

export const toFilters = (queryParams: SeasonQueryParams): SeasonFilters => ({
  isActive: queryParams.active,
  "*isActive": queryParams["*active"]
});
