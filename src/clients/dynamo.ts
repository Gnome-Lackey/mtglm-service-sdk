import * as aws from "aws-sdk";
import { AttributeMap } from "aws-sdk/clients/dynamodb";

import * as dynamoMapper from "../mappers/dynamo";

import {
  MatchPrimaryKey,
  SeasonPrimaryKey,
  SetPrimaryKey,
  RecordPrimaryKey,
  PotentialPrimaryKey,
  PlayerPrimaryKey
} from "../models/PrimaryKeys";
import {
  MatchDynamoItem,
  SeasonDynamoItem,
  SetDynamoItem,
  RecordDynamoItem,
  PlayerDynamoItem
} from "../models/Items";

import { PlayerFilters, SetFilters } from "../models/Filters";

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

  fetchByKeys = async (keys: PotentialPrimaryKey[]): Promise<AttributeMap[]> => {
    const config = dynamoMapper.toGetBatchConfiguration(keys, this.tableName);

    const results = await dynamoDB.batchGet(config).promise();

    return results.Responses[this.tableName];
  };

  fetchByKey = async (key: PotentialPrimaryKey): Promise<AttributeMap> => {
    const config = {
      Key: key,
      TableName: this.tableName
    };

    const result = await dynamoDB.get(config).promise();

    return result.Item;
  };

  async query(filters: PlayerFilters): Promise<AttributeMap[]>;
  async query(filters: SetFilters): Promise<AttributeMap[]>;
  async query(filters: any): Promise<AttributeMap[]> {
    const config = dynamoMapper.toScanConfiguration(filters, this.tableName);

    console.log(JSON.stringify(config));

    const results = await dynamoDB.scan(config).promise();

    return results.Items;
  }

  remove = async (key: PotentialPrimaryKey): Promise<void> => {
    const config = {
      Key: key,
      TableName: this.tableName
    };

    await dynamoDB.delete(config).promise();
  };

  async create(key: MatchPrimaryKey, item: MatchDynamoItem): Promise<AttributeMap>;
  async create(key: PlayerPrimaryKey, item: PlayerDynamoItem): Promise<AttributeMap>;
  async create(key: SeasonPrimaryKey, item: SeasonDynamoItem): Promise<AttributeMap>;
  async create(key: SetPrimaryKey, item: SetDynamoItem): Promise<AttributeMap>;
  async create(key: RecordPrimaryKey, item: RecordDynamoItem): Promise<AttributeMap>;
  async create(key: PotentialPrimaryKey, item: any): Promise<AttributeMap> {
    const config = {
      Item: item,
      TableName: this.tableName
    };

    await dynamoDB.put(config).promise();

    return await this.fetchByKey(key);
  }

  async update(key: MatchPrimaryKey, item: MatchDynamoItem): Promise<AttributeMap>;
  async update(key: PlayerPrimaryKey, item: PlayerDynamoItem): Promise<AttributeMap>;
  async update(key: SeasonPrimaryKey, item: SeasonDynamoItem): Promise<AttributeMap>;
  async update(key: SetPrimaryKey, item: SetDynamoItem): Promise<AttributeMap>;
  async update(key: RecordPrimaryKey, item: RecordDynamoItem): Promise<AttributeMap>;
  async update(key: PotentialPrimaryKey, item: any): Promise<AttributeMap> {
    const config = dynamoMapper.toUpdateConfiguration(
      key,
      item,
      this.updatableAttributes,
      this.tableName
    );

    await dynamoDB.update(config).promise();

    return await this.fetchByKey(key);
  }

  updateList = async (
    key: PotentialPrimaryKey,
    field: string,
    values: string[]
  ): Promise<AttributeMap> => {
    if (!this.updatableAttributes.includes(field)) {
      throw new Error("Update List Error: Invalid or protected attribute supplied.");
    }

    const config = dynamoMapper.toUpdateListConfiguration(key, field, values, this.tableName);

    await dynamoDB.update(config).promise();

    return this.fetchByKey(key);
  };

  updateSingleField = async (
    key: PotentialPrimaryKey,
    field: string,
    value: string | string[]
  ): Promise<AttributeMap> => {
    if (!this.updatableAttributes.includes(field)) {
      throw new Error("Update Field Error: Invalid or protected attribute supplied.");
    }

    const config = dynamoMapper.toUpdateSingleFieldConfiguration(key, field, value, this.tableName);

    await dynamoDB.update(config).promise();

    return this.fetchByKey(key);
  };
}
