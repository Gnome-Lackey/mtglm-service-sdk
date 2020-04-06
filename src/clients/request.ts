import * as http from "http";
import * as https from "https";

export default class RequestClient {
  private handleResponse(response: http.IncomingMessage, resolve: Function): void {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      resolve(JSON.parse(data));
    });
  }

  async get(url: string): Promise<http.IncomingMessage> {
    return new Promise((resolve, reject) => {
      console.log("Making outbound request to: ->", url);

      const req = https.get(url, (response) => this.handleResponse(response, resolve));

      req.on("error", reject);

      req.end();
    });
  }
}
