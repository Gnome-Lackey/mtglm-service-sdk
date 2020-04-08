import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { MatchUpdateRequest, MatchCreateRequest } from "../models/Requests";
import { MatchView } from "../models/Views";
import { MatchNode } from "../models/Nodes";
import { MatchDynamoCreateItem, MatchDynamoUpdateItem } from "../models/Items";
import { MatchQueryParameters } from "../models/QueryParameters";
import { MatchFilters } from "../models/Filters";

export default class MatchMapper {
  toCreateItem = (details: MatchCreateRequest): MatchDynamoCreateItem => {
    const date = new Date().valueOf().toString();

    return {
      matchId: uuid.v4(),
      seasonId: details.season,
      gamesPlayed: details.games,
      isSeasonPoint: details.isSeasonPoint,
      loserIds: details.losers,
      winnerIds: details.winners,
      wins: details.wins,
      updatedOn: date
    };
  };

  toUpdateItem = (data: MatchUpdateRequest): MatchDynamoUpdateItem => ({
    isSeasonPoint: data.isSeasonPoint,
    gamesPlayed: data.games,
    loserIds: data.losers,
    winnerIds: data.winners,
    wins: data.wins
  });

  toNode = (data: AttributeMap): MatchNode => ({
    matchId: data.matchId as string,
    isSeasonPoint: data.isSeasonPoint as boolean,
    seasonId: data.seasonId as string,
    gamesPlayed: data.gamesPlayed as number,
    loserIds: data.loserIds as string[],
    winnerIds: data.winnerIds as string[],
    wins: data.wins as number,
    updatedOn: data.updatedOn as string
  });

  toView = (data: MatchNode): MatchView => ({
    id: data.matchId,
    isSeasonPoint: data.isSeasonPoint,
    games: data.gamesPlayed,
    wins: data.wins
  });

  toFilters = (queryParams: MatchQueryParameters): MatchFilters => {
    const filters: MatchFilters = {};

    if (queryParams.seasonPoint === "true" || queryParams.seasonPoint === "false") {
      filters.isSeasonPoint = queryParams.seasonPoint === "true";
    } else if (queryParams["seasonPoint|"] === "true" || queryParams["seasonPoint|"] === "false") {
      filters["isSeasonPoint|"] = queryParams["seasonPoint|"] === "true";
    }

    if (queryParams.winners) {
      filters.winnerIds = queryParams.winners;
    } else if (queryParams["winners|"]) {
      filters["winnerIds|"] = queryParams["winners|"];
    }

    if (queryParams.losers) {
      filters.loserIds = queryParams.losers;
    } else if (queryParams["losers|"]) {
      filters["loserIds|"] = queryParams["losers|"];
    }

    if (queryParams.season) {
      filters.seasonId = queryParams.season;
    } else if (queryParams["season|"]) {
      filters["seasonId|"] = queryParams["season|"];
    }

    return filters;
  };
}
