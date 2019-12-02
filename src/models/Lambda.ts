import { PotentialPathParameters } from "./PathParameters";
import { PotentialQueryParameters } from "./QueryParameters";

export interface LambdaToken {
  sub: string;
}

export interface LambdaHeaders {
  Authorization: string;
}

export interface LambdaEvent {
  headers: LambdaHeaders;
  body?: string;
  pathParameters?: PotentialPathParameters;
  queryParameters?: PotentialQueryParameters;
}

export interface LambdaResponse {
  statusCode: number;
  body: string;
  headers: {
    [key: string]: string | boolean;
  };
}
