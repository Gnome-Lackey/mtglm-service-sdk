export const ERROR_NAMES: {
  [key: string]: string;
  AccountConflictException: string;
  AliasExistsException: string;
  CodeMismatchException: string;
  ExpiredCodeException: string;
  InvalidIdTokenException: string;
  InvalidPasswordException: string;
  InvalidParameterException: string;
  InvalidTokenException: string;
  MissingTokenException: string;
  NotAuthorizedException: string;
  UsernameExistsException: string;
  UserNotConfirmedException: string;
  UserNotFoundException: string;
} = {
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

export const ERROR_MESSAGES: {
  DEFAULT: {
    [key: string]: string;
    UNAUTHORIZED: string;
  },
  LOGIN: {
    [key: string]: string;
    INVALID_PASSWORD: string;
    MISSING_REQUIRED_ATTRIBUTE: string;
    UNAUTHORIZED: string;
    USER_NOT_CONFIRMED: string;
    USER_NOT_FOUND: string;
  },
  LOGOUT: {
    [key: string]: string;
  },
  RESEND_CONFIRMATION_CODE: {
    [key: string]: string;
  },
  CONFIRM_REGISTRATION: {
    [key: string]: string;
    ALIAS_EXISTS_EXCEPTION: string;
    INVALID_CONFIRMATION_CODE: string;
    EXPIRED_CONFIRMATION_CODE: string;
  },
  SIGN_UP: {
    [key: string]: string;
    ACCOUNT_CONFLICT_EXCEPTION: string;
    MISSING_REQUIRED_ATTRIBUTE: string;
    USER_EXISTS: string;
  },
  VALIDATE: {
    [key: string]: string;
    INVALID_TOKEN_EXCEPTION: string;
    MISSING_TOKEN_EXCEPTION: string;
    UNAUTHORIZED: string;
  }
} = {
  DEFAULT: {
    UNAUTHORIZED: "We're sorry, but you are not authorized to access this page."
  },
  LOGIN: {
    INVALID_PASSWORD: "The username or password you have entered does not match our records, please try again.",
    MISSING_REQUIRED_ATTRIBUTE: "Required username or password is missing from your request, please try again.",
    UNAUTHORIZED: "The username or password you have entered does not match our records, please try again.",
    USER_NOT_CONFIRMED: "You're account has not been confirmed. You can't continue until you have confirmed your account.",
    USER_NOT_FOUND: "The username you provided does not exist, please try again."
  },
  LOGOUT: {},
  RESEND_CONFIRMATION_CODE: {},
  CONFIRM_REGISTRATION: {
    ALIAS_EXISTS_EXCEPTION: "An account with that email already exists. Please register again to continue.",
    INVALID_CONFIRMATION_CODE: "The confirmation code you provided is invalid.",
    EXPIRED_CONFIRMATION_CODE: "The confirmation code you provided is expired. Please request a new code."
  },
  SIGN_UP: {
    ACCOUNT_CONFLICT_EXCEPTION: "An account with that email already exists.",
    MISSING_REQUIRED_ATTRIBUTE: "The information you provided is either invalid or missing. Please try again.",
    USER_EXISTS: "An account exists with the given username. Please use a different username to continue."
  },
  VALIDATE: {
    INVALID_TOKEN_EXCEPTION: "The token you provided is invalid.",
    MISSING_TOKEN_EXCEPTION: "Missing required token.",
    UNAUTHORIZED: "We're sorry, but you are not authorized to access this page."
  }
};

export const ERROR_CODES: {
  [key: string]: number;
  ALIAS_EXISTS_EXCEPTION: number;
  ACCOUNT_CONFLICT_EXCEPTION: number;
  INVALID_CONFIRMATION_CODE: number;
  EXPIRED_CONFIRMATION_CODE: number;
  MISSING_TOKEN_EXCEPTION: number;
  INVALID_TOKEN_EXCEPTION: number;
  INVALID_PASSWORD: number;
  MISSING_REQUIRED_ATTRIBUTE: number;
  UNAUTHORIZED: number;
  USER_EXISTS: number;
  USER_NOT_CONFIRMED: number;
  USER_NOT_FOUND: number;
} = {
  ALIAS_EXISTS_EXCEPTION: 409,
  ACCOUNT_CONFLICT_EXCEPTION: 409,
  INVALID_CONFIRMATION_CODE: 400,
  EXPIRED_CONFIRMATION_CODE: 400,
  MISSING_TOKEN_EXCEPTION: 401,
  INVALID_TOKEN_EXCEPTION: 401,
  INVALID_PASSWORD: 401,
  MISSING_REQUIRED_ATTRIBUTE: 400,
  UNAUTHORIZED: 401,
  USER_EXISTS: 409,
  USER_NOT_CONFIRMED: 401,
  USER_NOT_FOUND: 404
};

export const ERROR_DISPLAY_CODES: {
  [key: string]: string;
  ALIAS_EXISTS_EXCEPTION: string;
  ACCOUNT_CONFLICT_EXCEPTION: string;
  MISSING_TOKEN_EXCEPTION: string;
  INVALID_TOKEN_EXCEPTION: string;
  INVALID_CONFIRMATION_CODE: string;
  EXPIRED_CONFIRMATION_CODE: string;
  INVALID_PASSWORD: string;
  MISSING_REQUIRED_ATTRIBUTE: string;
  UNAUTHORIZED: string;
  USER_EXISTS: string;
  USER_NOT_CONFIRMED: string;
  USER_NOT_FOUND: string;
} = {
  ALIAS_EXISTS_EXCEPTION: "aliasExists",
  ACCOUNT_CONFLICT_EXCEPTION: "accountConflict",
  MISSING_TOKEN_EXCEPTION: "missingToken",
  INVALID_TOKEN_EXCEPTION: "invalidToken",
  INVALID_CONFIRMATION_CODE: "invalidConfirmationCode",
  EXPIRED_CONFIRMATION_CODE: "expiredConfirmationCode",
  INVALID_PASSWORD: "invalidCredentials",
  MISSING_REQUIRED_ATTRIBUTE: "badRequest",
  UNAUTHORIZED: "unauthorized",
  USER_EXISTS: "collision",
  USER_NOT_CONFIRMED: "unconfirmed",
  USER_NOT_FOUND: "notFound"
};

export const DEFAULT_ERROR_DISPLAY_CODES = "serverError";
export const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred. Please try again later";
export const DEFAULT_ERROR_CODE = 500;
