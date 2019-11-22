import {
  AuthenticationResultType,
  GetUserResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import { getAttributeByName } from "../utils/attributes";

import { SignUpBodyRequest } from "../models/Requests";
import { SignUpNode, AuthNode, TokensNode } from "../models/Nodes";
import { AuthResponse, AuthHeaderResponse } from "../models/Responses";
import { USER_ROLE } from "../constants/roles";

export const toNodeSignUp = (data: SignUpBodyRequest): SignUpNode => ({
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  userName: data.userName,
  password: data.password
});

export const toNodeAuth = (data: GetUserResponse): AuthNode => {
  const { Username: userName, UserAttributes: attributes } = data;

  const id = getAttributeByName("sub", attributes);
  const email = getAttributeByName("email", attributes);
  const name = getAttributeByName("name", attributes);
  const role = getAttributeByName("custom:role", attributes);
  const isFirstTimeLogin = !!parseInt(getAttributeByName("custom:firstTimeLogin", attributes), 10);

  return {
    user: {
      id,
      userName,
      email,
      name,
      isFirstTimeLogin,
      role
    }
  };
};

export const toNodeTokens = (tokens: AuthenticationResultType): TokensNode => ({
  accessToken: `${tokens.TokenType} ${tokens.AccessToken}`,
  refreshToken: tokens.RefreshToken,
  idToken: tokens.IdToken
});

export const toResponseLoginHeaders = (data: TokensNode): AuthHeaderResponse => ({
  "X-ID-Token": data.idToken,
  "X-Access-Token": data.accessToken,
  "set-cookie": `refreshToken=${data.refreshToken}; HttpOnly; Secure; SameSite=None;`,
  "Access-Control-Expose-Headers": "Authorization, x-access-token, x-id-token"
});

export const toResponseLogin = (data: AuthNode): AuthResponse => ({
  user: {
    id: data.user.id,
    userName: data.user.userName,
    email: data.user.email,
    displayName: data.user.name,
    accountType: data.user.role,
    isFirstTimeLogin: data.user.isFirstTimeLogin
  }
});

export const toResponseSignUp = (uid: string, data: SignUpNode): AuthResponse => ({
  user: {
    id: uid,
    userName: data.userName,
    email: data.email,
    displayName: `${data.firstName} ${data.lastName}`,
    accountType: USER_ROLE
  }
});

export const toResponseValidate = (data: GetUserResponse): AuthResponse => {
  const { Username: userName, UserAttributes: attributes } = data;

  const id = getAttributeByName("sub", attributes);
  const email = getAttributeByName("email", attributes);
  const name = getAttributeByName("name", attributes);
  const role = getAttributeByName("custom:role", attributes);

  return {
    user: {
      id,
      userName,
      email,
      displayName: name,
      accountType: role
    }
  };
};
