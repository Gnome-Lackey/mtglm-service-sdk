import { PotentialPrimaryKey } from "./PrimaryKeys";

export interface DynamoUpdateConfig {
  Key: PotentialPrimaryKey;
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: string | number | boolean | string[] };
  UpdateExpression: string;
  TableName: string;
}

export interface DynamoGetBatchConfig {
  RequestItems: {
    [tableName: string]: {
      Keys: PotentialPrimaryKey[];
    };
  };
}

export interface DynamoIndexConfig {
  ExpressionAttributeNames: {
    [index: string]: string;
  };
  ExpressionAttributeValues: {
    [iid: string]: string;
  };
  KeyConditionExpression: string;
  IndexName: string;
  TableName: string;
}

export interface DynamoUpdateListConfig {
  Key: PotentialPrimaryKey;
  ExpressionAttributeNames: {
    "#list": string;
    "#updatedOn": string;
  };
  ExpressionAttributeValues: {
    ":empty_list": string[];
    ":listItem": string[];
    ":updatedOn": string;
  };
  UpdateExpression: string;
  TableName: string;
}

export interface DynamoAttributeNames {
  [key: string]: string;
}

export interface DynamoAttributeValues {
  [key: string]: string | string[] | boolean | number;
}

export interface DynamoAttributeMapping {
  ExpressionAttributeNames: DynamoAttributeNames;
  ExpressionAttributeValues: DynamoAttributeValues;
  UpdateExpressions: string[];
  RemoveExpressions: string[];
}
