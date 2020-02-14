import { LambdaResponse } from "../models/Lambda";
import {
  ErrorResponse,
  MatchResponse,
  SeasonResponse,
  SuccessResponse,
  AuthResponse,
  AuthHeaderResponse,
  PlayerResponse,
  PlayerRoleResponse,
  SeasonMetadataResponse
} from "../models/Responses";

import { ScryfallCardView, ScryfallSetView } from "../models/Views";

import { DEFAULT_HEADERS } from "../constants/headers";
import {
  ERROR_NAMES,
  ERROR_MESSAGES,
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
  | "RESEND_CONFIRMATION_CODE"
  | "INIT_ADMIN_ACCOUNT";

export const handleError = (
  error: ErrorResponse,
  domain: ErrorDomains = "DEFAULT"
): LambdaResponse => {
  console.log("[ERROR] Original Error:", error);

  const name = ERROR_NAMES[error.code];
  const code = error.statusCode || DEFAULT_ERROR_CODE;
  const displayCode = ERROR_DISPLAY_CODES[domain][name] || DEFAULT_ERROR_DISPLAY_CODES;
  const message = ERROR_MESSAGES[domain][name] || DEFAULT_ERROR_MESSAGE;

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
export function handleSuccess(body: PlayerResponse): LambdaResponse;
export function handleSuccess(body: PlayerResponse[]): LambdaResponse;
export function handleSuccess(body: PlayerRoleResponse): LambdaResponse;
export function handleSuccess(body: PlayerRoleResponse[]): LambdaResponse;
export function handleSuccess(body: ScryfallCardView): LambdaResponse;
export function handleSuccess(body: ScryfallCardView[]): LambdaResponse;
export function handleSuccess(body: ScryfallSetView): LambdaResponse;
export function handleSuccess(body: ScryfallSetView[]): LambdaResponse;
export function handleSuccess(body: SeasonResponse): LambdaResponse;
export function handleSuccess(body: SeasonResponse[]): LambdaResponse;
export function handleSuccess(body: SeasonMetadataResponse): LambdaResponse;
export function handleSuccess(body: SeasonMetadataResponse[]): LambdaResponse;
export function handleSuccess(body: SuccessResponse): LambdaResponse;
export function handleSuccess(body: any, headers?: any): LambdaResponse {
  const statusCode = 200;

  console.log("[SUCCESS] Response:", statusCode, body);

  return {
    statusCode,
    headers: { ...DEFAULT_HEADERS, ...headers },
    body: JSON.stringify({
      status: statusCode,
      data: body
    })
  };
}
