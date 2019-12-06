import * as decodeToken from "jwt-decode";

import { handleError } from "../utils/response";

import { LambdaResponse, LambdaEvent, LambdaHeaders, LambdaToken } from "../models/Lambda";
import { PotentialPathParameters } from "../models/PathParameters";
import { PotentialQueryParameters } from "../models/QueryParameters";
import { PotentialRequest } from "../models/Requests";

import { ADMIN_ROLE } from "../constants/roles";

type RequestResourceMiddlewareCallbackType = (
  pathParameters?: PotentialPathParameters,
  data?: PotentialRequest,
  queryStringParameters?: PotentialQueryParameters
) => Promise<LambdaResponse>;

type GetUserIdMiddlewareType = (event: LambdaEvent) => Promise<LambdaResponse>;

const parseToken = (headers: LambdaHeaders, isAdminResource: boolean): LambdaToken => {
  if (!headers) {
    return null;
  }

  const body = decodeToken<LambdaToken>(headers.Authorization);

  if (!body || !body.sub) {
    return null;
  }

  const resourceAccessibleByAccount = !isAdminResource || body["custom:role"] === ADMIN_ROLE;

  if (!resourceAccessibleByAccount) {
    return null;
  }

  return body;
};

const parseData = (body: string): PotentialRequest => {
  if (!body) {
    return null;
  }

  return JSON.parse(body);
};

export default function requestResourceMiddleware(
  callback: RequestResourceMiddlewareCallbackType,
  isAdminResource: boolean
): GetUserIdMiddlewareType {
  return async (event: LambdaEvent): Promise<LambdaResponse> => {
    const { headers, body, pathParameters, queryStringParameters } = event;

    const tokenBody = parseToken(headers, isAdminResource);
    const hasValidToken = tokenBody && tokenBody.sub;

    if (hasValidToken) {
      const data = parseData(body);

      return await callback(pathParameters, data, queryStringParameters);
    } else {
      return handleError({
        code: "InvalidIdTokenException",
        message: "The ID token passed in is invalid and does not have a valid sub.",
        content: headers
      });
    }
  };
}
