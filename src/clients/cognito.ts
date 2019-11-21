import * as aws from "aws-sdk";
import {
  GetUserResponse,
  AuthenticationResultType,
  UserType,
  AdminGetUserResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import * as cognitoMapper from "../mappers/cognito";

import AccountConflictException from "../exceptions/AccountConflictException";
import InvalidTokenException from "../exceptions/InvalidTokenException";

import { SignUpNode } from "../models/Nodes";
import { SuccessResponse } from "../models/Responses";
import { UserAttribute } from "../models/Cognito";

const { USER_POOL_ID, CLIENT_ID } = process.env;

const cognito = new aws.CognitoIdentityServiceProvider({ region: "us-east-1" });

export const login = async (
  userName: string,
  password: string
): Promise<AuthenticationResultType> => {
  const authConfig = cognitoMapper.toAuthConfig(CLIENT_ID, USER_POOL_ID, userName, password);

  const result = await cognito.adminInitiateAuth(authConfig).promise();

  return result.AuthenticationResult;
};

export const getLoggedInUser = async (token: string): Promise<GetUserResponse> => {
  const getUserConfig = cognitoMapper.toGetUserConfig(token);

  const result = await cognito.getUser(getUserConfig).promise();

  const isTokenInvalid = !result || !result.UserAttributes;

  if (isTokenInvalid) {
    throw new InvalidTokenException();
  }

  return result;
};

export const getUser = async (userName: string): Promise<AdminGetUserResponse> => {
  const result = cognito
    .adminGetUser({
      UserPoolId: USER_POOL_ID,
      Username: userName
    })
    .promise();

  return result;
};

export const getAllUsers = async (): Promise<GetUserResponse[]> => {
  const results = await cognito
    .listUsers({
      UserPoolId: USER_POOL_ID
    })
    .promise();

  return results.Users.map((result: UserType) => ({
    Username: result.Username,
    UserAttributes: result.Attributes
  }));
};

export const updateUserAttribute = async (
  token: string,
  attributes: UserAttribute[]
): Promise<SuccessResponse> => {
  const updateAttributeConfig = cognitoMapper.toUpdateAttributeConfig(token, attributes);

  await cognito.updateUserAttributes(updateAttributeConfig).promise();

  return { message: "successfully updated attribute." };
};

export const logout = async (AccessToken: string): Promise<SuccessResponse> => {
  await cognito.globalSignOut({ AccessToken }).promise();

  return { message: "successfully logged out." };
};

export const confirmRegistration = async (
  code: string,
  userName: string
): Promise<SuccessResponse> => {
  const config = cognitoMapper.toConfirmSignUpConfig(CLIENT_ID, code, userName);

  await cognito.confirmSignUp(config).promise();

  return { message: "successfully logged out." };
};

export const resendConfirmationCode = async (userName: string): Promise<SuccessResponse> => {
  const config = cognitoMapper.toResendConfirmationCodeConfig(CLIENT_ID, userName);

  await cognito.resendConfirmationCode(config).promise();

  return { message: "successfully resent confirmation code." };
};

export const signUp = async (node: SignUpNode): Promise<string> => {
  const { email } = node;

  const listUsersConfig = cognitoMapper.toListUsersConfig(USER_POOL_ID, email);

  const listUsersResult = await cognito.listUsers(listUsersConfig).promise();

  const accountWithEmailExists = listUsersResult && listUsersResult.Users.length;

  if (accountWithEmailExists) {
    throw new AccountConflictException();
  }

  const signUpConfig = cognitoMapper.toSignUpConfig(CLIENT_ID, node);

  const signUpResult = await cognito.signUp(signUpConfig).promise();

  return signUpResult.UserSub;
};

export const validate = async (token: string): Promise<GetUserResponse> => {
  const config = cognitoMapper.toGetUserConfig(token);

  const result = await cognito.getUser(config).promise();

  const isTokenInvalid = !result || !result.UserAttributes;

  if (isTokenInvalid) {
    throw new InvalidTokenException();
  }

  return result;
};