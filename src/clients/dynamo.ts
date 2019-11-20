import * as aws from "aws-sdk";
import { AttributeMap } from "aws-sdk/clients/dynamodb";

import * as dynamoMapper from "../mappers/dynamo";

import {
  PlayerPrimaryKey,
  MatchPrimaryKey,
  SeasonPrimaryKey,
  SetPrimaryKey,
  RecordPrimaryKey,
  PotentialPrimaryKey
} from "../models/PrimaryKeys";
import {
  MatchDynamoItem,
  PlayerDynamoItem,
  SeasonDynamoItem,
  SetDynamoItem,
  RecordDynamoItem
} from "../models/Items";

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

  // TODO: Uncomment when we need this
  // fetchByIndex = async (iid: string, index: string): Promise<AttributeMap[]> => {
  //   const config = dynamoMapper.toIndexConfiguration(iid, index, this.tableName);

  //   const GSIResults = await dynamoDB.query(config).promise();

  //   const keys = GSIResults.Items.map(({ objectiveId, missionId }) => ({ objectiveId, missionId }));

  //   if (!keys.length) {
  //     return [];
  //   }

  //   return await this.fetchByKeys(keys);
  // };

  // TODO: Uncomment when we need this
  // query = async (id: string, hashKey: string): Promise<AttributeMap[]> => {
  //   const config = dynamoMapper.toQueryConfiguration(id, this.tableName);

  //   const GSIResults = await dynamoDB.query(config).promise();

  //   const keys = GSIResults.Items.map((result: AttributeMap) => {
  //     const hashValue = result[hashKey] as string;

  //     return {
  //       [hashKey]: hashValue
  //     };
  //   });

  //   if (!keys.length) {
  //     return [];
  //   }

  //   return await this.fetchByKeys(keys);
  // };

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
