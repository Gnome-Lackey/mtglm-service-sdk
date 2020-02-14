import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import {
  SeasonCreateRequest,
  SeasonUpdateRequest,
  SeasonMetadataDynamoUpdateRequest
} from "../models/Requests";
import { SeasonView, SeasonMetadataView } from "../models/Views";
import { SeasonNode, SeasonMetadataNode } from "../models/Nodes";
import {
  SeasonDynamoCreateItem,
  SeasonDynamoUpdateItem,
  SeasonMetadataDynamoCreateItem,
  SeasonMetadataDynamoUpdateItem
} from "../models/Items";

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

export function toMetadataCreateItem(
  seasonId: string,
  playerId: string
): SeasonMetadataDynamoCreateItem {
  const date = new Date().valueOf().toString();

  return {
    seasonId,
    playerId,
    seasonLosses: 0,
    seasonWins: 0,
    totalLosses: 0,
    totalWins: 0,
    matchIds: [],
    playedOpponentIds: [],
    updatedOn: date
  };
}

export const toMetadataUpdateItem = (
  data: SeasonMetadataDynamoUpdateRequest
): SeasonMetadataDynamoUpdateItem => ({
  seasonLosses: data.seasonLosses,
  seasonWins: data.seasonWins,
  totalLosses: data.totalLosses,
  totalWins: data.totalWins,
  playedOpponentIds: data.playedOpponentIds
});

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

export const toMetadataNode = (data: AttributeMap): SeasonMetadataNode => ({
  playerId: data.playerId as string,
  seasonId: data.seasonId as string,
  playedOpponentIds: data.playedOpponentIds as string[],
  seasonWins: data.seasonWins as number,
  seasonLosses: data.seasonLosses as number,
  totalWins: data.totalWins as number,
  totalLosses: data.totalLosses as number,
  matchIds: data.matchIds as string[]
});

export const toView = (data: SeasonNode): SeasonView => ({
  id: data.seasonId,
  isActive: data.isActive,
  startedOn: data.startDate,
  endedOn: data.endDate
});

export const toMetadataView = (data: SeasonMetadataNode): SeasonMetadataView => ({
  seasonWins: data.seasonWins,
  seasonLosses: data.seasonLosses,
  totalWins: data.totalWins,
  totalLosses: data.totalLosses
});
