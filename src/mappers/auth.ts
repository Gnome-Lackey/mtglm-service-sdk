import {
  AuthenticationResultType,
  GetUserResponse,
  AdminCreateUserResponse,
  AttributeType
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import { SignUpBodyRequest } from "../models/Requests";
import { SignUpNode, AuthNode, TokensNode, UserNode } from "../models/Nodes";
import { AuthResponse, AuthHeaderResponse } from "../models/Responses";

import { USER_ROLE } from "../constants/roles";

export default class AuthMapper {
  constructor() {
    Function.prototype.bind(this.toUserNode, this);
  }

  private getAttributeByName = (name: string, attrs: AttributeType[]): string => {
    const attribute = attrs.find((attr) => attr.Name === name);

    return attribute ? attribute.Value : "";
  };

  private toUserNode(data: GetUserResponse): UserNode;
  private toUserNode(data: AdminCreateUserResponse): UserNode;
  private toUserNode(data: GetUserResponse): UserNode;
  private toUserNode(data: any): UserNode {
    const { Username: userName, UserAttributes: attributes } = data;

    const isFirstTimeLogin = !!parseInt(
      this.getAttributeByName("custom:firstTimeLogin", attributes),
      10
    );

    return {
      id: this.getAttributeByName("sub", attributes),
      email: this.getAttributeByName("email", attributes),
      name: this.getAttributeByName("name", attributes),
      firstName: this.getAttributeByName("given_name", attributes),
      lastName: this.getAttributeByName("family_name", attributes),
      role: this.getAttributeByName("custom:role", attributes),
      isFirstTimeLogin,
      userName
    };
  }

  toNodeSignUp = (data: SignUpBodyRequest): SignUpNode => ({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.userName,
    password: data.password
  });

  toNodeAuth = (data: GetUserResponse): AuthNode => ({
    user: this.toUserNode(data)
  });

  toNodeTokens = (tokens: AuthenticationResultType): TokensNode => ({
    accessToken: `${tokens.TokenType} ${tokens.AccessToken}`,
    refreshToken: tokens.RefreshToken,
    idToken: tokens.IdToken
  });

  toResponseLoginHeaders = (data: TokensNode): AuthHeaderResponse => ({
    "X-ID-Token": data.idToken,
    "X-Access-Token": data.accessToken,
    "set-cookie": `refreshToken=${data.refreshToken}; HttpOnly; Secure; SameSite=None;`,
    "Access-Control-Expose-Headers": "Authorization, x-access-token, x-id-token"
  });

  toResponseLogin = (data: AuthNode): AuthResponse => ({
    user: {
      id: data.user.id,
      userName: data.user.userName,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      displayName: data.user.name,
      accountType: data.user.role,
      isFirstTimeLogin: data.user.isFirstTimeLogin
    }
  });

  toResponseInitAdmin = (data: AdminCreateUserResponse): AuthResponse => {
    const extractedAttributes = this.toUserNode(data);

    return {
      user: {
        userName: extractedAttributes.userName,
        id: extractedAttributes.id,
        email: extractedAttributes.email,
        firstName: extractedAttributes.firstName,
        lastName: extractedAttributes.lastName,
        displayName: extractedAttributes.name,
        accountType: extractedAttributes.role
      }
    };
  };

  toResponseSignUp = (uid: string, data: SignUpNode): AuthResponse => ({
    user: {
      id: uid,
      userName: data.userName,
      email: data.email,
      displayName: `${data.firstName} ${data.lastName}`,
      accountType: USER_ROLE
    }
  });

  toResponseValidate = (data: GetUserResponse): AuthResponse => {
    const extractedAttributes = this.toUserNode(data);

    return {
      user: {
        userName: extractedAttributes.userName,
        id: extractedAttributes.id,
        email: extractedAttributes.email,
        firstName: extractedAttributes.firstName,
        lastName: extractedAttributes.lastName,
        displayName: extractedAttributes.name,
        accountType: extractedAttributes.role
      }
    };
  };
}
