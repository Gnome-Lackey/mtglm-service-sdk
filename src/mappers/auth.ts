import {
  AuthenticationResultType,
  GetUserResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import { getAttributeByName } from "../utils/attributes";

import { AuthNode } from "../models/Nodes";
import { SignUpBodyRequest } from "../models/Requests";
import { SignUpNode } from "../models/Nodes";
import { AuthView } from "../models/Views";

export const toNodeSignUp = (data: SignUpBodyRequest): SignUpNode => ({
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  userName: data.userName,
  password: data.password
});

export const toNodeAuth = (user: GetUserResponse, tokens: AuthenticationResultType): AuthNode => {
  const { TokenType, AccessToken, IdToken, RefreshToken } = tokens;
  const { Username: userName, UserAttributes: attributes } = user;

  const id = getAttributeByName("sub", attributes);
  const email = getAttributeByName("email", attributes);
  const name = getAttributeByName("name", attributes);
  const role = getAttributeByName("custom:role", attributes);
  const totalWins = parseInt(getAttributeByName("custom:totalWins", attributes), 10);
  const totalLosses = parseInt(getAttributeByName("custom:totalLosses", attributes), 10);
  const isFirstTimeLogin = !!parseInt(getAttributeByName("custom:firstTimeLogin", attributes), 10);

  return {
    user: {
      id,
      userName,
      email,
      name,
      isFirstTimeLogin,
      role,
      totalLosses,
      totalWins
    },
    tokens: {
      accessToken: `${TokenType} ${AccessToken}`,
      refreshToken: RefreshToken,
      idToken: IdToken
    }
  };
};

export const toViewAuth = (data: AuthNode): AuthView => {
  const headers = {
    "X-ID-Token": data.tokens.idToken,
    "X-Access-Token": data.tokens.accessToken,
    "set-cookie": `refreshToken=${data.tokens.refreshToken}; HttpOnly; Secure; SameSite=None;`
  };

  return {
    body: {
      user: {
        id: data.user.id,
        userName: data.user.userName,
        email: data.user.email,
        name: data.user.name,
        totalLosses: data.user.totalLosses,
        totalWins: data.user.totalWins,
        accountType: data.user.role
      }
    },
    headers
  };
};
