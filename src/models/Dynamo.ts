import { PotentialPrimaryKey } from "./PrimaryKeys";

export interface DynamoUpdateConfig {
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: string | number | boolean | string[] };
  Key: PotentialPrimaryKey;
  TableName: string;
  UpdateExpression: string;
}

export interface DynamoGetBatchConfig {
  RequestItems: {
    [tableName: string]: {
      Keys: PotentialPrimaryKey[];
    };
  };
}

export interface DynamoIndexConfig {
  ExpressionAttributeNames: { [index: string]: string; };
  ExpressionAttributeValues: { [iid: string]: string; };
  IndexName: string;
  KeyConditionExpression: string;
  TableName: string;
}

export interface DynamoUpdateListConfig {
  ConditionExpression: string;
  ExpressionAttributeNames: {
    "#list": string;
    "#updatedOn": string;
  };
  ExpressionAttributeValues: {
    ":empty_list": string[];
    ":listItem": string[];
    ":updatedOn": string;
  };
  Key: PotentialPrimaryKey;
  TableName: string;
  UpdateExpression: string;
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
  RemoveExpressions: string[];
  UpdateExpressions: string[];
}
