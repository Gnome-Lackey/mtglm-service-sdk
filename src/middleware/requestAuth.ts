import { LambdaResponse, LambdaEvent, LambdaHeaders } from "../models/Lambda";
import {
  LoginBodyRequest,
  ConfirmRegistrationBodyRequest,
  ResendConfirmationCodeBodyRequest,
  SignUpBodyRequest
} from "../models/Requests";

type RequestBodyType =
  | LoginBodyRequest
  | ConfirmRegistrationBodyRequest
  | ResendConfirmationCodeBodyRequest
  | SignUpBodyRequest;

type RequestAuthMiddlewareCallbackBodyType = (data: RequestBodyType) => Promise<LambdaResponse>;
type RequestAuthMiddlewareCallbackTokenType = (token: string) => Promise<LambdaResponse>;
type GetUserIdMiddlewareType = (event: LambdaEvent) => Promise<LambdaResponse>;

const parseData = (body: string): RequestBodyType => {
  if (!body) {
    return null;
  }

  return JSON.parse(body);
};

const parseAuth = (headers: LambdaHeaders): string => {
  if (!headers) {
    return null;
  }

  return headers.Authorization;
};

export function requestAuthMiddleware(
  callback: RequestAuthMiddlewareCallbackBodyType
): GetUserIdMiddlewareType;
export function requestAuthMiddleware(
  callback: RequestAuthMiddlewareCallbackTokenType
): GetUserIdMiddlewareType;
export function requestAuthMiddleware(callback: Function): GetUserIdMiddlewareType {
  return async (event: LambdaEvent): Promise<LambdaResponse> => {
    const { headers, body } = event;
    
    const authorization = parseAuth(headers);
    const data = parseData(body);

    return await callback(authorization || data);
  };
}
