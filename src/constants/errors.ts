import { ErrorDomains, ErrorNames } from "src/models/Errors";

export const ERROR_NAMES: ErrorNames = {
  AccountConflictException: "ACCOUNT_CONFLICT_EXCEPTION",
  AliasExistsException: "ALIAS_EXISTS_EXCEPTION",
  CodeMismatchException: "INVALID_CONFIRMATION_CODE",
  ExpiredCodeException: "EXPIRED_CONFIRMATION_CODE",
  InvalidIdTokenException: "UNAUTHORIZED",
  InvalidPasswordException: "INVALID_PASSWORD",
  InvalidParameterException: "MISSING_REQUIRED_ATTRIBUTE",
  InvalidTokenException: "INVALID_TOKEN_EXCEPTION",
  MissingTokenException: "MISSING_TOKEN_EXCEPTION",
  NotAuthorizedException: "UNAUTHORIZED",
  UsernameExistsException: "USER_EXISTS",
  UserNotConfirmedException: "USER_NOT_CONFIRMED",
  UserNotFoundException: "USER_NOT_FOUND"
};

export const ERROR_MESSAGES: ErrorDomains = {
  CONFIRM_REGISTRATION: {
    ALIAS_EXISTS_EXCEPTION: "An account with that email already exists. Please register again to continue.",
    EXPIRED_CONFIRMATION_CODE: "The confirmation code you provided is expired. Please request a new code.",
    INVALID_CONFIRMATION_CODE: "The confirmation code you provided is invalid.",
    UNAUTHORIZED: "We're sorry, but you are not authorized to access this page."
  },
  DEFAULT: {
    UNAUTHORIZED: "We're sorry, but you are not authorized to access this page."
  },
  LOGIN: {
    INVALID_PASSWORD: "The username or password you have entered does not match our records, please try again.",
    MISSING_REQUIRED_ATTRIBUTE: "Required username or password is missing from your request, please try again.",
    USER_NOT_CONFIRMED: "You're account has not been confirmed. You can't continue until you have confirmed your account.",
    USER_NOT_FOUND: "The username you provided does not exist, please try again.",
    UNAUTHORIZED: "The username or password you have entered does not match our records, please try again."
  },
  SIGN_UP: {
    ACCOUNT_CONFLICT_EXCEPTION: "An account with that email already exists.",
    MISSING_REQUIRED_ATTRIBUTE: "The information you provided is either invalid or missing. Please try again.",
    INVALID_PASSWORD: "The password you supplied does not meet the sign up requirements. Please try again.",
    UNAUTHORIZED: "We're sorry, but you are not authorized to access this page.",
    USER_EXISTS: "An account exists with the given username. Please use a different username to continue."
  },
  VALIDATE: {
    INVALID_TOKEN_EXCEPTION: "The token you provided is invalid.",
    MISSING_TOKEN_EXCEPTION: "Missing required token.",
    UNAUTHORIZED: "We're sorry, but you are not authorized to access this page."
  }
};

export const ERROR_DISPLAY_CODES: ErrorDomains = {
  CONFIRM_REGISTRATION: {
    ALIAS_EXISTS_EXCEPTION: "aliasExists",
    EXPIRED_CONFIRMATION_CODE: "expiredConfirmationCode",
    INVALID_CONFIRMATION_CODE: "invalidConfirmationCode",
    UNAUTHORIZED: "unauthorized"
  },
  DEFAULT: {
    UNAUTHORIZED: "unauthorized"
  },
  LOGIN: {
    INVALID_PASSWORD: "invalidCredentials",
    MISSING_REQUIRED_ATTRIBUTE: "badRequest",
    UNAUTHORIZED: "unauthorized",
    USER_NOT_CONFIRMED: "unconfirmed",
    USER_NOT_FOUND: "notFound"
  },
  SIGN_UP: {
    ACCOUNT_CONFLICT_EXCEPTION: "accountConflict",
    MISSING_REQUIRED_ATTRIBUTE: "badRequest",
    INVALID_PASSWORD: "badPassword",
    UNAUTHORIZED: "unauthorized",
    USER_EXISTS: "collision"
  },
  VALIDATE: {
    INVALID_TOKEN_EXCEPTION: "unauthorized",
    MISSING_TOKEN_EXCEPTION: "unauthorized",
    UNAUTHORIZED: "unauthorized"
  }
};

export const DEFAULT_ERROR_DISPLAY_CODES = "serverError";
export const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred. Please try again later.";
export const DEFAULT_ERROR_CODE = 500;
