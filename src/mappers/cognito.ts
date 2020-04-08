import {
  AdminInitiateAuthRequest,
  UpdateUserAttributesRequest,
  ConfirmSignUpRequest,
  GetUserRequest,
  ResendConfirmationCodeRequest,
  ListUsersRequest,
  SignUpRequest,
  AdminUpdateUserAttributesRequest,
  AdminCreateUserRequest,
  AdminGetUserRequest
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import { UserAttribute } from "../models/Cognito";
import { SignUpNode } from "../models/Nodes";

import { USER_ROLE, ADMIN_ROLE } from "../constants/roles";

export default class CognitoMapper {
  toAuthConfig = (
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

  toAdminUpdateAttributeConfig = (
    poolId: string,
    userName: string,
    UserAttributes: UserAttribute[]
  ): AdminUpdateUserAttributesRequest => ({
    UserPoolId: poolId,
    Username: userName,
    UserAttributes
  });

  toUpdateAttributeConfig = (
    AccessToken: string,
    UserAttributes: UserAttribute[]
  ): UpdateUserAttributesRequest => ({
    AccessToken,
    UserAttributes
  });

  toConfirmSignUpConfig = (
    clientId: string,
    code: string,
    userName: string
  ): ConfirmSignUpRequest => ({
    ClientId: clientId,
    ConfirmationCode: code,
    Username: userName
  });

  toAdminGetUserConfig = (poolId: string, userName: string): AdminGetUserRequest => ({
    UserPoolId: poolId,
    Username: userName
  });

  toGetUserConfig = (token: string): GetUserRequest => ({
    AccessToken: token
  });

  toResendConfirmationCodeConfig = (
    clientId: string,
    userName: string
  ): ResendConfirmationCodeRequest => ({
    ClientId: clientId,
    Username: userName
  });

  toListUsersConfig = (poolId: string, username: string, email: string): ListUsersRequest => ({
    UserPoolId: poolId,
    AttributesToGet: ["email", "username"],
    Filter: `email="${email}" OR username="${username}"`
  });

  toAdminCreateUser = (
    userName: string,
    poolId: string,
    pass: string,
    email: string
  ): AdminCreateUserRequest => ({
    UserPoolId: poolId,
    Username: userName,
    TemporaryPassword: pass,
    UserAttributes: [
      {
        Name: "email",
        Value: email
      },
      {
        Name: "given_name",
        Value: "Boss Man"
      },
      {
        Name: "family_name",
        Value: "McBoss"
      },
      {
        Name: "name",
        Value: "Boss Man McBoss"
      },
      {
        Name: "custom:firstTimeLogin",
        Value: "0"
      },
      {
        Name: "custom:role",
        Value: ADMIN_ROLE
      }
    ]
  });

  toSignUpConfig = (clientId: string, data: SignUpNode): SignUpRequest => {
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
}
