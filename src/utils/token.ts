import MissingTokenException from "../exceptions/MissingTokenException";
import InvalidTokenException from "../exceptions/InvalidTokenException";

export const parseToken = (authorization: string): string => {
  console.log("[INFO]: Parsing Token", authorization);

  if (!authorization) {
    throw new MissingTokenException();
  } else if (!/^Bearer /.test(authorization)) {
    throw new InvalidTokenException();
  }

  const token = authorization.split("Bearer")[1];

  if (!token) {
    throw new MissingTokenException();
  }

  return token.trim();
};
