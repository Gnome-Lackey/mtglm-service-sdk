export const ERROR_NAMES: {
  InvalidIdTokenException: string;
  NotAuthorizedException: string;
} = {
  InvalidIdTokenException: "UNAUTHORIZED",
  NotAuthorizedException: "UNAUTHORIZED"
};

export const ERROR_MESSAGES: {
  [key: string]: string;
  UNAUTHORIZED: string;
} = {
  UNAUTHORIZED: "We're sorry, but you are not authorized to access this page."
};

export const ERROR_CODES: {
  [key: string]: number;
  UNAUTHORIZED: number;
} = {
  UNAUTHORIZED: 401
};

export const ERROR_DISPLAY_CODES: {
  [key: string]: string;
  UNAUTHORIZED: string;
} = {
  UNAUTHORIZED: "unauthorized"
};

export const DEFAULT_ERROR_DISPLAY_CODE = "serverError";

export const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred. Please try again later";

export const DEFAULT_ERROR_CODE = 500;
