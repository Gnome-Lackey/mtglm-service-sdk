import { LambdaResponse } from "../models/Lambda";
import { ScryfallCardView, ScryfallSetView } from "../models/Views";
import {
  ErrorResponse,
  MatchResponse,
  SeasonResponse,
  SuccessResponse,
  AuthResponse,
  AuthHeaderResponse,
  PlayerResponse,
  PlayerRoleResponse
} from "../models/Responses";

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

export default class ResponseHandler {
  constructor() {
    Function.prototype.bind(this.success, this);
  }

  error = (error: ErrorResponse, domain: ErrorDomains = "DEFAULT"): LambdaResponse => {
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

  success(body: AuthResponse, headers?: AuthHeaderResponse): LambdaResponse;
  success(body: MatchResponse): LambdaResponse;
  success(body: MatchResponse[]): LambdaResponse;
  success(body: PlayerResponse): LambdaResponse;
  success(body: PlayerResponse[]): LambdaResponse;
  success(body: PlayerRoleResponse): LambdaResponse;
  success(body: PlayerRoleResponse[]): LambdaResponse;
  success(body: ScryfallCardView): LambdaResponse;
  success(body: ScryfallCardView[]): LambdaResponse;
  success(body: ScryfallSetView): LambdaResponse;
  success(body: ScryfallSetView[]): LambdaResponse;
  success(body: SeasonResponse): LambdaResponse;
  success(body: SeasonResponse[]): LambdaResponse;
  success(body: SuccessResponse): LambdaResponse;
  success(body: any, headers?: any): LambdaResponse {
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
}
