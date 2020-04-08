export const DEFAULT_HEADERS: {
  "Content-Type": string;
  "Access-Control-Allow-Origin": string;
  "Access-Control-Allow-Credentials": boolean;
} = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN,
  "Access-Control-Allow-Credentials": true
};
