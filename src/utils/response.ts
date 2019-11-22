import { LambdaResponse } from "../models/Lambda";
import {
  ErrorResponse,
  RecordResponse,
  RecordDetailsResponse,
  MatchResponse,
  MatchDetailsResponse,
  SeasonResponse,
  SeasonDetailsResponse,
  SetResponse,
  SuccessResponse,
  AuthResponse,
  AuthHeaderResponse,
  PlayerResponse,
  PlayerDetailsResponse
} from "../models/Responses";

import { DEFAULT_HEADERS } from "../constants/headers";
import {
  ERROR_NAMES,
  ERROR_MESSAGES,
  ERROR_CODES,
  ERROR_DISPLAY_CODES,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_DISPLAY_CODES,
  DEFAULT_ERROR_MESSAGE
} from "../constants/errors";

type ErrorDomains =
  | "DEFAULT"
  | "LOGIN"
  | "CONFIRM_REGISTRATION"
  | "SIGN_UP"
  | "VALIDATE"
  | "LOGOUT"
  | "RESEND_CONFIRMATION_CODE";

export const handleError = (
  error: ErrorResponse,
  domain: ErrorDomains = "DEFAULT"
): LambdaResponse => {
  console.log("[ERROR] Original Error:", error);

  const name = ERROR_NAMES[error.code];
  const code = ERROR_CODES[name] || DEFAULT_ERROR_CODE;
  const displayCode = ERROR_DISPLAY_CODES[name] || DEFAULT_ERROR_DISPLAY_CODES;
  const message = ERROR_MESSAGES[domain] ? ERROR_MESSAGES[domain][name] : DEFAULT_ERROR_MESSAGE;

  console.log("[ERROR] Response:", code, displayCode, message);

  return {
    statusCode: code,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      status: code,
      data: {
        error: {
          name: displayCode,
          message
        }
      }
    })
  };
};

export function handleSuccess(body: AuthResponse, headers?: AuthHeaderResponse): LambdaResponse;
export function handleSuccess(body: MatchResponse): LambdaResponse;
export function handleSuccess(body: MatchResponse[]): LambdaResponse;
export function handleSuccess(body: MatchDetailsResponse): LambdaResponse;
export function handleSuccess(body: MatchDetailsResponse[]): LambdaResponse;
export function handleSuccess(body: PlayerResponse): LambdaResponse;
export function handleSuccess(body: PlayerResponse[]): LambdaResponse;
export function handleSuccess(body: PlayerDetailsResponse): LambdaResponse;
export function handleSuccess(body: PlayerDetailsResponse[]): LambdaResponse;
export function handleSuccess(body: RecordResponse): LambdaResponse;
export function handleSuccess(body: RecordResponse[]): LambdaResponse;
export function handleSuccess(body: RecordDetailsResponse): LambdaResponse;
export function handleSuccess(body: RecordDetailsResponse[]): LambdaResponse;
export function handleSuccess(body: SeasonResponse): LambdaResponse;
export function handleSuccess(body: SeasonResponse[]): LambdaResponse;
export function handleSuccess(body: SeasonDetailsResponse): LambdaResponse;
export function handleSuccess(body: SeasonDetailsResponse[]): LambdaResponse;
export function handleSuccess(body: SetResponse): LambdaResponse;
export function handleSuccess(body: SetResponse[]): LambdaResponse;
export function handleSuccess(body: SuccessResponse): LambdaResponse;
export function handleSuccess(body: any, headers?: any): LambdaResponse {
  const statusCode = 200;
  const parsedBody = body || {};

  console.log("[SUCCESS] Response:", statusCode, parsedBody);

  return {
    statusCode,
    headers: { ...DEFAULT_HEADERS, ...headers },
    body: JSON.stringify({
      status: statusCode,
      data: parsedBody
    })
  };
}
