import { AttributeMap } from "aws-sdk/clients/dynamodb";

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
import { MatchFilters, PlayerFilters, SeasonFilters } from "../models/Filters";

export default class DynamoMapper {
  constructor() {
    Function.prototype.bind(this.toScanResults, this);
  }

  buildAttributeMapping = (
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

  toScanResults(filters: MatchFilters, items: AttributeMap[]): AttributeMap[];
  toScanResults(filters: PlayerFilters, items: AttributeMap[]): AttributeMap[];
  toScanResults(filters: SeasonFilters, items: AttributeMap[]): AttributeMap[];
  toScanResults(filters: any, items: AttributeMap[]): AttributeMap[] {
    const filterNames = Object.keys(filters);

    if (!filterNames || !filterNames.length) {
      return items;
    }

    const isStringMatch = (
      itemValue: string,
      filterValue: string,
      isOrStatement: boolean
    ): boolean =>
      isOrStatement
        ? itemValue.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
        : itemValue.toLowerCase() === filterValue.toLowerCase();

    const shouldFilterItem = (
      itemValue: any,
      filterValue: string,
      isOrStatement: boolean
    ): boolean =>
      typeof itemValue === "object"
        ? itemValue.some((value: string | number | boolean) =>
            isStringMatch(value.toString(), filterValue, isOrStatement)
          )
        : isStringMatch(itemValue.toString(), filterValue, isOrStatement);

    const handleFilter = (filterName: string, item: AttributeMap): boolean => {
      const filterValue = filters[filterName];

      const isString = typeof filterValue === "string";
      const isArray = /^\[\].*$/.test(filterValue);
      const isOrStatement = /^.*[|]$/.test(filterName);

      const parsedFilterName = isOrStatement ? filterName.split("|")[0] : filterName;

      const itemValue = item[parsedFilterName];

      if (isArray) {
        const filterValues = filterValue.split("[]")[1].split(",") as string[];

        return filterValues.some((value) =>
          shouldFilterItem(itemValue as any[], value, isOrStatement)
        );
      } else if (isString) {
        return shouldFilterItem(itemValue as any, filterValue, isOrStatement);
      }

      return itemValue === filterValue;
    };

    const hasOrStatement = filterNames.some((filterName) => /^.*[|]$/.test(filterName));

    return hasOrStatement
      ? items.filter((item: AttributeMap) =>
          filterNames.some((filterName) => handleFilter(filterName, item))
        )
      : items.filter((item: AttributeMap) =>
          filterNames.every((filterName) => handleFilter(filterName, item))
        );
  }

  toUpdateConfiguration = (
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
    } = this.buildAttributeMapping(attributes, item);

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

  toUpdateSingleFieldConfiguration = (
    key: PotentialPrimaryKey,
    field: string,
    value: string | string[],
    tableName: string
  ): DynamoUpdateConfig => this.toUpdateConfiguration(key, { [field]: value }, [field], tableName);

  toUpdateListConfiguration = (
    key: PotentialPrimaryKey,
    name: string,
    list: string[],
    tableName: string
  ): DynamoUpdateListConfig => {
    const UpdateListExpression =
      "#list = list_append(if_not_exists(#list, :empty_list), :listItem)";
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

  toGetBatchConfiguration = (
    keys: PotentialPrimaryKey[],
    tableName: string
  ): DynamoGetBatchConfig => ({
    RequestItems: {
      [tableName]: {
        Keys: keys
      }
    }
  });

  toIndexConfiguration = (iid: string, index: string, tableName: string): DynamoIndexConfig => ({
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
}
