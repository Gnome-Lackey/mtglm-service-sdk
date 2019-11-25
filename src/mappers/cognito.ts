import {
  AdminInitiateAuthRequest,
  UpdateUserAttributesRequest,
  ConfirmSignUpRequest,
  GetUserRequest,
  ResendConfirmationCodeRequest,
  ListUsersRequest,
  SignUpRequest,
  AdminUpdateUserAttributesRequest
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import { UserAttribute } from "../models/Cognito";
import { SignUpNode } from "../models/Nodes";

import { USER_ROLE } from "../constants/roles";

export const toAuthConfig = (
  clientId: string,
  poolId: string,
  userName: string,
  password: string
): AdminInitiateAuthRequest => ({
  AuthFlow: "ADMIN_NO_SRP_AUTH",
  ClientId: clientId,
  UserPoolId: poolId,
  AuthParameters: {
    USERNAME: userName,
    PASSWORD: password
  }
});

export const toAdminUpdateAttributeConfig = (
  poolId: string,
  userName: string,
  UserAttributes: UserAttribute[]
): AdminUpdateUserAttributesRequest => ({
  UserPoolId: poolId,
  Username: userName,
  UserAttributes
});

export const toUpdateAttributeConfig = (
  AccessToken: string,
  UserAttributes: UserAttribute[]
): UpdateUserAttributesRequest => ({
  AccessToken,
  UserAttributes
});

export const toConfirmSignUpConfig = (
  clientId: string,
  code: string,
  userName: string
): ConfirmSignUpRequest => ({
  ClientId: clientId,
  ConfirmationCode: code,
  Username: userName
});

export const toGetUserConfig = (token: string): GetUserRequest => ({
  AccessToken: token
});

export const toResendConfirmationCodeConfig = (
  clientId: string,
  userName: string
): ResendConfirmationCodeRequest => ({
  ClientId: clientId,
  Username: userName
});

export const toListUsersConfig = (poolId: string, email: string): ListUsersRequest => ({
  UserPoolId: poolId,
  AttributesToGet: ["email"],
  Filter: `email="${email}"`
});

export const toSignUpConfig = (clientId: string, data: SignUpNode): SignUpRequest => {
  const { email, firstName, lastName, userName, password } = data;

  const attributeList = [
    {
      Name: "email",
      Value: email
    },
    {
      Name: "custom:firstTimeLogin",
      Value: "1"
    },
    {
      Name: "custom:role",
      Value: USER_ROLE
    }
  ];

  if (firstName && lastName) {
    attributeList.push({
      Name: "name",
      Value: `${firstName} ${lastName}`
    });
  }

  if (firstName) {
    attributeList.push({
      Name: "given_name",
      Value: firstName
    });
  }

  if (lastName) {
    attributeList.push({
      Name: "family_name",
      Value: lastName
    });
  }

  return {
    ClientId: clientId,
    Password: password,
    Username: userName,
    UserAttributes: attributeList
  };
};
