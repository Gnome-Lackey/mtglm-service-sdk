import * as http from "http";
import * as https from "https";

export const get = async (url: string): Promise<http.IncomingMessage> =>
  new Promise((resolve, reject) => {
    console.log("Making outbound request to: ->", url);

    const req = https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    req.on("error", reject);

    req.end();
  });
