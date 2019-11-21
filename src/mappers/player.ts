import { GetUserResponse, AdminGetUserResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";

import { getAttributeByName } from "../utils/attributes";

import { PlayerView } from "../models/Views";
import { PlayerNode } from "../models/Nodes";

export function toNode(data: AdminGetUserResponse): PlayerNode;
export function toNode(data: GetUserResponse): PlayerNode;
export function toNode(data: any): PlayerNode {
  const { Username: userName, UserAttributes: attributes } = data;

  const id = getAttributeByName("sub", attributes);
  const email = getAttributeByName("email", attributes);
  const name = getAttributeByName("name", attributes);
  const role = getAttributeByName("custom:role", attributes);
  const totalWins = parseInt(getAttributeByName("custom:totalWins", attributes), 10);
  const totalLosses = parseInt(getAttributeByName("custom:totalLosses", attributes), 10);
  const isFirstTimeLogin = !!parseInt(
    getAttributeByName("custom:isFirstTimeLogin", attributes),
    10
  );

  return { id, userName, name, totalWins, totalLosses, email, isFirstTimeLogin, role };
};

export const toView = (data: PlayerNode): PlayerView => ({
  id: data.id,
  email: data.email,
  userName: data.userName,
  name: data.name,
  totalLosses: data.totalLosses,
  totalWins: data.totalWins,
  accountType: data.role
});
