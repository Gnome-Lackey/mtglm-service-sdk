import { PotentialPathParameters } from "./PathParameters";
import { PotentialQueryParameters } from "./QueryParameters";

export interface LambdaToken {
  "custom:role": string;
  sub: string;
}

export interface LambdaHeaders {
  Authorization: string;
}

export interface LambdaEvent {
  body?: string;
  headers: LambdaHeaders;
  pathParameters?: PotentialPathParameters;
  queryStringParameters?: PotentialQueryParameters;
}

export interface LambdaResponse {
  body: string;
  headers: { [key: string]: string | boolean; };
  statusCode: number;
}
