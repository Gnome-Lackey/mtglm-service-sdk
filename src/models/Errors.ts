export interface ErrorNames {
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
}

export interface ErrorDomains {
  CONFIRM_REGISTRATION: {
    [key: string]: string;
    ALIAS_EXISTS_EXCEPTION: string;
    EXPIRED_CONFIRMATION_CODE: string;
    INVALID_CONFIRMATION_CODE: string;
    UNAUTHORIZED: string;
  };
  DEFAULT: {
    [key: string]: string;
    UNAUTHORIZED: string;
  };
  INIT_ADMIN_ACCOUNT?: {
    [key: string]: string;
  };
  LOGIN: {
    [key: string]: string;
    INVALID_PASSWORD: string;
    MISSING_REQUIRED_ATTRIBUTE: string;
    UNAUTHORIZED: string;
    USER_NOT_CONFIRMED: string;
    USER_NOT_FOUND: string;
  };
  LOGOUT?: {
    [key: string]: string;
  };
  RESEND_CONFIRMATION_CODE?: {
    [key: string]: string;
  };
  SIGN_UP: {
    [key: string]: string;
    ACCOUNT_CONFLICT_EXCEPTION: string;
    MISSING_REQUIRED_ATTRIBUTE: string;
    INVALID_PASSWORD: string;
    UNAUTHORIZED: string;
    USER_EXISTS: string;
  };
  VALIDATE: {
    [key: string]: string;
    INVALID_TOKEN_EXCEPTION: string;
    MISSING_TOKEN_EXCEPTION: string;
    UNAUTHORIZED: string;
  };
}
