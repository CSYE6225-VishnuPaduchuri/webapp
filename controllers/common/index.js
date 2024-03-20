import { customLogger } from "../../app/index.js";

export const MethodNotSupported = (req, res) => {
  customLogger.error("Method not supported", {
    method: req.method,
    path: req.originalUrl,
  });
  res.status(405).send();
  return;
};
