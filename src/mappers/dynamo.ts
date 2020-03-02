import { ScanInput } from "aws-sdk/clients/dynamodb";

import {
  DynamoUpdateListConfig,
  DynamoGetBatchConfig,
  DynamoIndexConfig,
  DynamoUpdateConfig,
  DynamoAttributeValues,
  DynamoAttributeNames,
  DynamoAttributeMapping
} from "../models/Dynamo";

import { PotentialPrimaryKey } from "../models/PrimaryKeys";

import { MatchFilters, PlayerFilters, SeasonFilters } from "src/models/Filters";

const buildAttributeMapping = (
  attributes: string[],
  item: DynamoAttributeValues
): DynamoAttributeMapping => {
  const ExpressionAttributeNames: DynamoAttributeNames = {};
  const ExpressionAttributeValues: DynamoAttributeValues = {};
  const UpdateExpressions: string[] = [];
  const RemoveExpressions: string[] = [];

  attributes.forEach((attribute) => {
    if (item[attribute]) {
      ExpressionAttributeNames[`#${attribute}`] = attribute;
      ExpressionAttributeValues[`:${attribute}`] = item[attribute];
      UpdateExpressions.push(`#${attribute} = :${attribute}`);
    } else if (
      (item[attribute] as string[]) &&
      (item[attribute] as string[]).length &&
      (item[attribute] as string[]).length === 0
    ) {
      ExpressionAttributeNames[`#${attribute}`] = attribute;
      RemoveExpressions.push(`#${attribute}`);
    }
  });

  return {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpressions,
    RemoveExpressions
  };
};

export function toScanConfiguration(queryParams: MatchFilters, tableName: string): ScanInput;
export function toScanConfiguration(queryParams: PlayerFilters, tableName: string): ScanInput;
export function toScanConfiguration(queryParams: SeasonFilters, tableName: string): ScanInput;
export function toScanConfiguration(queryParams: any, tableName: string): ScanInput {
  if (!queryParams) {
    return { TableName: tableName };
  }

  const scanInput = Object.keys(queryParams).reduce(
    (input: any, queryParam: string) => {
      const queryNameParts = queryParam.split("*");
      const queryValueParts = queryParams[queryParam].split("[]");
      const isArray = queryValueParts.length > 1;
      const parsedFilter = queryNameParts.length > 1 ? queryNameParts[0] : queryParam;

      if (isArray) {
        const queryValues = queryValueParts[1].split(",");
        const queryNames = [];

        for (let i = 0; i < queryValues.length; i += 1) {
          const valueName = `:statement${i}`;

          queryNames.push(valueName);

          input.ExpressionAttributeValues[valueName] = queryValues[i];
        }

        const statement = queryNames
          .map((queryName) => `contains(${parsedFilter}, ${queryName})`)
          .join(" OR ");

        input.FilterExpressionOr.push(statement);
      } else {
        const value = `:${queryParam}`;
        const statement = `${queryParam} = ${value}`;

        input.ExpressionAttributeValues[value] = queryParams[queryParam];
        input.FilterExpressionAnd.push(statement);
      }

      return input;
    },
    {
      ExpressionAttributeValues: {},
      FilterExpressionOr: [],
      FilterExpressionAnd: [],
      TableName: tableName
    }
  );

  let expression;
  const andExpression = scanInput.FilterExpressionAnd.join(" AND ");
  const orExpression = scanInput.FilterExpressionOr.join(" OR ");

  if (andExpression.length && orExpression.length) {
    expression = `${andExpression} AND ${orExpression}`;
  } else if (andExpression.length) {
    expression = andExpression;
  } else {
    expression = orExpression;
  }

  return {
    TableName: scanInput.TableName,
    ExpressionAttributeNames: scanInput.ExpressionAttributeNames,
    ExpressionAttributeValues: scanInput.ExpressionAttributeValues,
    FilterExpression: expression
  };
}

export const toUpdateConfiguration = (
  key: PotentialPrimaryKey,
  item: DynamoAttributeValues,
  attributes: string[],
  tableName: string
): DynamoUpdateConfig => {
  const {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpressions,
    RemoveExpressions
  } = buildAttributeMapping(attributes, item);

  if (UpdateExpressions.length || RemoveExpressions.length) {
    ExpressionAttributeNames["#updatedOn"] = "updatedOn";
    ExpressionAttributeValues[":updatedOn"] = new Date().valueOf().toString();
    UpdateExpressions.push("#updatedOn = :updatedOn");
  }

  const expressions = [];

  if (RemoveExpressions.length) {
    expressions.push(`REMOVE ${RemoveExpressions.join(" ")}`);
  }

  if (UpdateExpressions.length) {
    expressions.push(`SET ${UpdateExpressions.join(", ")}`);
  }

  return {
    Key: key,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpression: expressions.join(" "),
    TableName: tableName
  };
};

export const toUpdateSingleFieldConfiguration = (
  key: PotentialPrimaryKey,
  field: string,
  value: string | string[],
  tableName: string
): DynamoUpdateConfig => toUpdateConfiguration(key, { [field]: value }, [field], tableName);

export const toUpdateListConfiguration = (
  key: PotentialPrimaryKey,
  name: string,
  list: string[],
  tableName: string
): DynamoUpdateListConfig => {
  const UpdateListExpression = "#list = list_append(if_not_exists(#list, :empty_list), :listItem)";
  const ConditionExpression = "not contains (#list, :listItem)";
  const UpdateExpression = `SET ${UpdateListExpression}, #updatedOn = :updatedOn`;
  const emptyList: string[] = [];
  const updatedOn = new Date().valueOf().toString();

  return {
    ExpressionAttributeNames: {
      "#list": name,
      "#updatedOn": "updatedOn"
    },
    ExpressionAttributeValues: {
      ":listItem": list,
      ":empty_list": emptyList,
      ":updatedOn": updatedOn
    },
    Key: key,
    UpdateExpression,
    ConditionExpression,
    TableName: tableName
  };
};

export const toGetBatchConfiguration = (
  keys: PotentialPrimaryKey[],
  tableName: string
): DynamoGetBatchConfig => ({
  RequestItems: {
    [tableName]: {
      Keys: keys
    }
  }
});

export const toIndexConfiguration = (
  iid: string,
  index: string,
  tableName: string
): DynamoIndexConfig => ({
  ExpressionAttributeNames: {
    "#index": index
  },
  ExpressionAttributeValues: {
    ":iid": iid
  },
  KeyConditionExpression: `#index = :iid`,
  IndexName: index,
  TableName: tableName
});
