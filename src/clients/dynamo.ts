import { DynamoDB } from "aws-sdk";

import {
  AttributeMap,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap
} from "aws-sdk/clients/dynamodb";

import DynamoMapper from "../mappers/dynamo";

import { MatchFilters, PlayerFilters, SeasonFilters } from "../models/Filters";
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

export default class MTGLMDynamoClient {
  private tableName: string;
  private updatableAttributes: string[];

  private database = new DynamoDB.DocumentClient({ region: "us-east-1" });
  private mapper = new DynamoMapper();

  constructor(tableName: string, updatableAttributes: string[] = []) {
    if (!tableName) {
      throw new Error("MTGLM Dynamo Client Error: Missing required property table name.");
    }

    this.tableName = tableName;
    this.updatableAttributes = updatableAttributes;

    Function.prototype.bind(this.query, this);
    Function.prototype.bind(this.create, this);
    Function.prototype.bind(this.update, this);
    Function.prototype.bind(this.updateList, this);
  }

  fetchByKeys = async (keys: PotentialPrimaryKey[]): Promise<AttributeMap[]> => {
    const config = this.mapper.toGetBatchConfiguration(keys, this.tableName);

    const results = await this.database.batchGet(config).promise();

    return results.Responses[this.tableName];
  };

  fetchByKey = async (key: PotentialPrimaryKey): Promise<AttributeMap> => {
    const config = {
      Key: key,
      TableName: this.tableName
    };

    const result = await this.database.get(config).promise();

    return result.Item;
  };

  custom = async (
    attributeNames: ExpressionAttributeNameMap,
    attributeValues: ExpressionAttributeValueMap,
    expression: string
  ): Promise<AttributeMap[]> => {
    const result = await this.database
      .query({
        TableName: this.tableName,
        ExpressionAttributeNames: attributeNames,
        ExpressionAttributeValues: attributeValues,
        FilterExpression: expression
      })
      .promise();

    return result.Items;
  };

  async query(filters?: MatchFilters): Promise<AttributeMap[]>;
  async query(filters?: PlayerFilters): Promise<AttributeMap[]>;
  async query(filters?: SeasonFilters): Promise<AttributeMap[]>;
  async query(filters?: any): Promise<AttributeMap[]> {
    const result = await this.database.scan({ TableName: this.tableName }).promise();

    return this.mapper.toScanResults(filters, result.Items);
  }

  remove = async (key: PotentialPrimaryKey): Promise<void> => {
    const config = {
      Key: key,
      TableName: this.tableName
    };

    await this.database.delete(config).promise();
  };

  async create(key: MatchPrimaryKey, item: MatchDynamoCreateItem): Promise<AttributeMap>;
  async create(key: SeasonPrimaryKey, item: SeasonDynamoCreateItem): Promise<AttributeMap>;
  async create(key: PlayerPrimaryKey, item: PlayerDynamoCreateItem): Promise<AttributeMap>;
  async create(key: any, item: any): Promise<AttributeMap> {
    const config = {
      Item: item,
      TableName: this.tableName
    };

    await this.database.put(config).promise();

    return await this.fetchByKey(key);
  }

  async update(key: MatchPrimaryKey, item: MatchDynamoUpdateItem): Promise<AttributeMap>;
  async update(key: SeasonPrimaryKey, item: SeasonDynamoUpdateItem): Promise<AttributeMap>;
  async update(key: PlayerPrimaryKey, item: PlayerDynamoUpdateItem): Promise<AttributeMap>;
  async update(key: any, item: any): Promise<AttributeMap> {
    const config = this.mapper.toUpdateConfiguration(
      key,
      item,
      this.updatableAttributes,
      this.tableName
    );

    await this.database.update(config).promise();

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

    const config = this.mapper.toUpdateListConfiguration(key, field, values, this.tableName);

    await this.database.update(config).promise();

    return this.fetchByKey(key);
  }

  updateSingleField = async (
    key: PotentialPrimaryKey,
    field: string,
    value: string | string[]
  ): Promise<AttributeMap> => {
    if (!this.updatableAttributes.includes(field)) {
      throw new Error("Update Field Error: Invalid or protected attribute supplied.");
    }

    const config = this.mapper.toUpdateSingleFieldConfiguration(key, field, value, this.tableName);

    await this.database.update(config).promise();

    return this.fetchByKey(key);
  };
}
