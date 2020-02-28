import * as aws from "aws-sdk";

import {
  AttributeMap,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap
} from "aws-sdk/clients/dynamodb";

import * as dynamoMapper from "../mappers/dynamo";

import {
  MatchPrimaryKey,
  SeasonPrimaryKey,
  PotentialPrimaryKey,
  PlayerPrimaryKey,
  SeasonMetadataKey
} from "../models/PrimaryKeys";

import {
  MatchDynamoCreateItem,
  SeasonDynamoCreateItem,
  PlayerDynamoCreateItem,
  MatchDynamoUpdateItem,
  SeasonDynamoUpdateItem,
  PlayerDynamoUpdateItem
} from "../models/Items";

import {
  SeasonQueryParams,
  MatchQueryParameters,
  PlayerQueryParameters,
  ScryfallCardQueryParameters
} from "../models/QueryParameters";

const dynamoDB = new aws.DynamoDB.DocumentClient({
  region: "us-east-1"
});

export class MTGLMDynamoClient {
  tableName: string;
  updatableAttributes: string[];

  constructor(tableName: string, updatableAttributes: string[] = []) {
    if (!tableName) {
      throw new Error("MTGLM Dynamo Client Error: Missing required property table name.");
    }

    this.tableName = tableName;
    this.updatableAttributes = updatableAttributes;
  }

  async fetchByKeys(keys: PotentialPrimaryKey[]): Promise<AttributeMap[]> {
    const config = dynamoMapper.toGetBatchConfiguration(keys, this.tableName);

    const results = await dynamoDB.batchGet(config).promise();

    return results.Responses[this.tableName];
  }

  async fetchByKey(key: PotentialPrimaryKey): Promise<AttributeMap> {
    const config = {
      Key: key,
      TableName: this.tableName
    };

    const result = await dynamoDB.get(config).promise();

    return result.Item;
  }

  async custom(
    attributeNames: ExpressionAttributeNameMap,
    attributeValues: ExpressionAttributeValueMap,
    expression: string
  ): Promise<AttributeMap[]> {
    const result = await dynamoDB
      .query({
        TableName: this.tableName,
        ExpressionAttributeNames: attributeNames,
        ExpressionAttributeValues: attributeValues,
        FilterExpression: expression
      })
      .promise();

    return result.Items;
  }

  async query(queryParams?: ScryfallCardQueryParameters): Promise<AttributeMap[]>;
  async query(queryParams?: MatchQueryParameters): Promise<AttributeMap[]>;
  async query(queryParams?: PlayerQueryParameters): Promise<AttributeMap[]>;
  async query(queryParams?: SeasonQueryParams): Promise<AttributeMap[]>;
  async query(queryParams?: any): Promise<AttributeMap[]> {
    const config = dynamoMapper.toScanConfiguration(queryParams, this.tableName);

    console.log(JSON.stringify(config));

    const result = await dynamoDB.scan(config).promise();

    return result.Items;
  }

  async remove(key: PotentialPrimaryKey): Promise<void> {
    const config = {
      Key: key,
      TableName: this.tableName
    };

    await dynamoDB.delete(config).promise();
  }

  async create(key: MatchPrimaryKey, item: MatchDynamoCreateItem): Promise<AttributeMap>;
  async create(key: SeasonPrimaryKey, item: SeasonDynamoCreateItem): Promise<AttributeMap>;
  async create(key: PlayerPrimaryKey, item: PlayerDynamoCreateItem): Promise<AttributeMap>;
  async create(key: any, item: any): Promise<AttributeMap> {
    const config = {
      Item: item,
      TableName: this.tableName
    };

    await dynamoDB.put(config).promise();

    return await this.fetchByKey(key);
  }

  async update(key: MatchPrimaryKey, item: MatchDynamoUpdateItem): Promise<AttributeMap>;
  async update(key: SeasonPrimaryKey, item: SeasonDynamoUpdateItem): Promise<AttributeMap>;
  async update(key: PlayerPrimaryKey, item: PlayerDynamoUpdateItem): Promise<AttributeMap>;
  async update(key: any, item: any): Promise<AttributeMap> {
    const config = dynamoMapper.toUpdateConfiguration(
      key,
      item,
      this.updatableAttributes,
      this.tableName
    );

    await dynamoDB.update(config).promise();

    return await this.fetchByKey(key);
  }

  async updateList(key: SeasonMetadataKey, field: string, values: string[]): Promise<AttributeMap>;
  async updateList(key: MatchPrimaryKey, field: string, values: string[]): Promise<AttributeMap>;
  async updateList(key: SeasonPrimaryKey, field: string, values: string[]): Promise<AttributeMap>;
  async updateList(key: PlayerPrimaryKey, field: string, values: string[]): Promise<AttributeMap>;
  async updateList(key: any, field: string, values: string[]): Promise<AttributeMap> {
    if (!this.updatableAttributes.includes(field)) {
      throw new Error("Update List Error: Invalid or protected attribute supplied.");
    }

    const config = dynamoMapper.toUpdateListConfiguration(key, field, values, this.tableName);

    await dynamoDB.update(config).promise();

    return this.fetchByKey(key);
  }

  async updateSingleField(
    key: PotentialPrimaryKey,
    field: string,
    value: string | string[]
  ): Promise<AttributeMap> {
    if (!this.updatableAttributes.includes(field)) {
      throw new Error("Update Field Error: Invalid or protected attribute supplied.");
    }

    const config = dynamoMapper.toUpdateSingleFieldConfiguration(key, field, value, this.tableName);

    await dynamoDB.update(config).promise();

    return this.fetchByKey(key);
  }
}
