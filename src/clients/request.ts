import * as http from "http";
import * as https from "https";

export const get = async (url: string): Promise<http.IncomingMessage> =>
  new Promise((resolve, reject) => {
    const req = https.get(url);

    req.on("response", (res) => resolve(res));
    req.on("error", (err) => reject(err));
  });
