import * as decodeToken from "jwt-decode";

import { handleError } from "../utils/response";

import { LambdaResponse, LambdaEvent, LambdaHeaders, LambdaToken } from "../models/Lambda";
import { PotentialPathParameters } from "../models/PathParameters";
import { PotentialQueryParameters } from "../models/QueryParameters";
import { PotentialRequest } from "../models/Requests";

type RequestResourceMiddlewareCallbackType = (
  pathParameters?: PotentialPathParameters,
  data?: PotentialRequest,
  queryStringParameters?: PotentialQueryParameters
) => Promise<LambdaResponse>;

type GetUserIdMiddlewareType = (event: LambdaEvent) => Promise<LambdaResponse>;

const parseUserId = (headers: LambdaHeaders): string => {
  if (!headers) {
    return null;
  }

  const body = decodeToken<LambdaToken>(headers.Authorization);

  if (!body || !body.sub) {
    return null;
  }

  return body.sub;
};

const parseData = (body: string): PotentialRequest => {
  if (!body) {
    return null;
  }

  return JSON.parse(body);
};

export default function requestResourceMiddleware(
  callback: RequestResourceMiddlewareCallbackType
): GetUserIdMiddlewareType {
  return async (event: LambdaEvent): Promise<LambdaResponse> => {
    const { headers, body, pathParameters, queryStringParameters } = event;

    const userId = parseUserId(headers);
    const data = parseData(body);

    if (userId) {
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
