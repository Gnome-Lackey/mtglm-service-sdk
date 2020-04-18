import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { SeasonCreateRequest, SeasonUpdateRequest } from "../models/Requests";
import { SeasonView } from "../models/Views";
import { SeasonNode } from "../models/Nodes";
import { SeasonDynamoCreateItem, SeasonDynamoUpdateItem } from "../models/Items";
import { SeasonQueryParams } from "../models/QueryParameters";
import { SeasonFilters } from "../models/Filters";

export default class SeasonMapper {
  toCreateItem = (data: SeasonCreateRequest): SeasonDynamoCreateItem => {
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
  };

  toUpdateItem = (data: SeasonUpdateRequest): SeasonDynamoUpdateItem => ({
    isActive: data.isActive,
    endDate: data.endedOn,
    setCode: data.set,
    playerIds: data.players
  });

  toNode = (data: AttributeMap): SeasonNode => ({
    seasonId: data.seasonId as string,
    isActive: data.isActive as boolean,
    startDate: data.startDate as string,
    endDate: data.endDate as string,
    setCode: data.setCode as string,
    playerIds: data.playerIds as string[],
    updatedOn: data.updatedOn as string
  });

  toView = (data: SeasonNode): SeasonView => ({
    id: data.seasonId,
    isActive: data.isActive,
    startedOn: data.startDate,
    endedOn: data.endDate
  });

  toFilters = (queryParams: SeasonQueryParams): SeasonFilters => {
    const filters: SeasonFilters = {};

    if (queryParams.active === "true" || queryParams.active === "false") {
      filters.isActive = queryParams.active === "true";
    } else if (queryParams["active|"] === "true" || queryParams["active|"] === "false") {
      filters["isActive|"] = queryParams["active|"] === "true";
    }

    return filters;
  };
}
