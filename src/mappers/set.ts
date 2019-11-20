import * as uuid from "uuid";

import { AttributeMap } from "aws-sdk/clients/dynamodb";

import { SetCreateRequest, SetUpdateRequest } from "../models/Requests";
import { SetNode } from "../models/Nodes";
import { SetDynamoItem } from "../models/Items";

export function toItem(data: SetCreateRequest): SetDynamoItem;
export function toItem(data: SetUpdateRequest): SetDynamoItem;
export function toItem(data: any): SetDynamoItem {
  const date = new Date().valueOf().toString();

  return {
    setId: uuid.v4(),
    setName: data.name,
    icon: data.icon,
    updatedOn: date
  };
}

export const toNode = (data: AttributeMap): SetNode => ({
  setId: data.setId as string,
  setName: data.setName as string,
  icon: data.icon as string,
  updatedOn: data.updatedOn as string
});
