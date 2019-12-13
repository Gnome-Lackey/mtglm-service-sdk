import * as http from "http";

export const get = async (url: string): Promise<http.IncomingMessage> => new Promise((resolve, reject) => {
  const req = http.get(url);

  req.on('response', (res) => resolve(res));
  req.on('error', (err) => reject(err));
});
