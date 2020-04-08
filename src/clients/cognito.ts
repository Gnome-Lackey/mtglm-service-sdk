import { CognitoIdentityServiceProvider } from "aws-sdk";

import {
  GetUserResponse,
  AuthenticationResultType,
  AdminCreateUserResponse,
  AdminGetUserResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import CognitoMapper from "../mappers/cognito";

import AccountConflictException from "../exceptions/AccountConflictException";
import InvalidTokenException from "../exceptions/InvalidTokenException";

import { SignUpNode } from "../models/Nodes";
import { SuccessResponse } from "../models/Responses";
import { UserAttribute } from "../models/Cognito";

export default class CognitoClient {
  private provider = new CognitoIdentityServiceProvider({ region: "us-east-1" });
  private mapper = new CognitoMapper();

  private adminPassword = process.env.ADMIN_PASS;
  private adminEmail = process.env.ADMIN_EMAIL;
  private userPoolId = process.env.USER_POOL_ID;
  private clientId = process.env.CLIENT_ID;

  login = async (userName: string, password: string): Promise<AuthenticationResultType> => {
    const authConfig = this.mapper.toAuthConfig(this.clientId, this.userPoolId, userName, password);

    const result = await this.provider.adminInitiateAuth(authConfig).promise();

    return result.AuthenticationResult;
  };

  adminGetUser = async (userName: string): Promise<AdminGetUserResponse> => {
    const adminGetUserConfig = this.mapper.toAdminGetUserConfig(this.userPoolId, userName);

    const result = await this.provider.adminGetUser(adminGetUserConfig).promise();

    return result;
  };

  getLoggedInUser = async (token: string): Promise<GetUserResponse> => {
    const getUserConfig = this.mapper.toGetUserConfig(token);

    const result = await this.provider.getUser(getUserConfig).promise();

    const isTokenInvalid = !result || !result.UserAttributes;

    if (isTokenInvalid) {
      throw new InvalidTokenException();
    }

    return result;
  };

  adminUpdateUserAttribute = async (
    userName: string,
    attributes: UserAttribute[]
  ): Promise<SuccessResponse> => {
    const adminUpdateAttributeConfig = this.mapper.toAdminUpdateAttributeConfig(
      this.userPoolId,
      userName,
      attributes
    );

    await this.provider.adminUpdateUserAttributes(adminUpdateAttributeConfig).promise();

    return { message: "successfully updated attribute." };
  };

  updateUserAttribute = async (
    token: string,
    attributes: UserAttribute[]
  ): Promise<SuccessResponse> => {
    const updateAttributeConfig = this.mapper.toUpdateAttributeConfig(token, attributes);

    await this.provider.updateUserAttributes(updateAttributeConfig).promise();

    return { message: "successfully updated attribute." };
  };

  logout = async (AccessToken: string): Promise<SuccessResponse> => {
    await this.provider.globalSignOut({ AccessToken }).promise();

    return { message: "successfully logged out." };
  };

  confirmRegistration = async (code: string, userName: string): Promise<SuccessResponse> => {
    const config = this.mapper.toConfirmSignUpConfig(this.clientId, code, userName);

    await this.provider.confirmSignUp(config).promise();

    return { message: "successfully logged out." };
  };

  resendConfirmationCode = async (userName: string): Promise<SuccessResponse> => {
    const config = this.mapper.toResendConfirmationCodeConfig(this.clientId, userName);

    await this.provider.resendConfirmationCode(config).promise();

    return { message: "successfully resent confirmation code." };
  };

  initAdminAccount = async (): Promise<AdminCreateUserResponse> => {
    const userName = "admin";

    const listUsersConfig = this.mapper.toListUsersConfig(
      this.userPoolId,
      userName,
      this.adminEmail
    );

    const listUsersResult = await this.provider.listUsers(listUsersConfig).promise();

    const accountWithEmailExists = listUsersResult && listUsersResult.Users.length;

    if (accountWithEmailExists) {
      return null;
    }

    const config = this.mapper.toAdminCreateUser(
      userName,
      this.userPoolId,
      this.adminPassword,
      this.adminEmail
    );

    const adminCreateUserResult = await this.provider.adminCreateUser(config).promise();

    await this.provider
      .adminSetUserPassword({
        Password: this.adminPassword,
        UserPoolId: this.userPoolId,
        Username: userName,
        Permanent: true
      })
      .promise();

    return adminCreateUserResult;
  };

  signUp = async (node: SignUpNode): Promise<string> => {
    const { email, userName } = node;

    const listUsersConfig = this.mapper.toListUsersConfig(this.userPoolId, userName, email);

    const listUsersResult = await this.provider.listUsers(listUsersConfig).promise();

    const accountWithEmailExists = listUsersResult && listUsersResult.Users.length;

    if (accountWithEmailExists) {
      throw new AccountConflictException();
    }

    const signUpConfig = this.mapper.toSignUpConfig(this.clientId, node);

    const signUpResult = await this.provider.signUp(signUpConfig).promise();

    return signUpResult.UserSub;
  };

  validate = async (token: string): Promise<GetUserResponse> => {
    const config = this.mapper.toGetUserConfig(token);

    const result = await this.provider.getUser(config).promise();

    const isTokenInvalid = !result || !result.UserAttributes;

    if (isTokenInvalid) {
      throw new InvalidTokenException();
    }

    return result;
  };
}
