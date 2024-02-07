import {
  ValidateEmailAddress,
  ValidatePassword,
} from "../utils/common/index.js";

export const handleParamsAndBody = (req, res, next) => {
  // Desctructure the request object
  const { body, query, url } = req;

  const queryParams = Object.keys(query);
  const bodyJson = Object.keys(body);

  // if there are any query params sent with the GET call then
  // we will be sending status 400 as we don't accept any query params

  // if request has any queryParams or if its has empty ?
  // exmaple : /healthz? or /healthz?path=moon
  // we should reject this request and return 405

  if (queryParams.length > 0 || url.includes("?")) {
    res.status(400).send();
  }
  // if request has any JSON in the body with key value pairs
  // or if its empty object then we have to reject this request and return 405

  // Reference: Inspired from code (the length check) that was referenced from https://stackoverflow.com/questions/42921727/how-to-check-req-body-empty-or-not-in-node-express
  else if (bodyJson.length > 0 || !!req.headers["content-type"]) {
    res.status(400).send();
  } else {
    next();
  }
};

export const handleRequestBodyForUserPostCall = (req, res, next) => {
  const { body, query, url } = req;

  const queryParams = Object.keys(query);
  const bodyJson = Object.keys(body);

  // if body is empty then we have to reject this request and return 400
  if (
    bodyJson.length === 0 ||
    (req.headers["content-type"] &&
      req.headers["content-type"] !== "application/json") ||
    req.headers["authorization"]
  ) {
    res.status(400).send();
  } else if (queryParams.length > 0 || url.includes("?")) {
    res.status(400).send();
  } else {
    next();
  }
};

export const handleWhiteListedKeysForUserPostCall = (req, res, next) => {
  const { body } = req;
  const bodyJson = Object.keys(body);

  // these are the keys that we are expecting in the body of the request
  const mandatoryKeys = ["first_name", "last_name", "password", "username"];

  const unwantedKeys = mandatoryKeys.filter((key) => !bodyJson.includes(key));

  if (unwantedKeys.length > 0) {
    res.status(400).send();
  }

  if (unwantedKeys.length === 0) {
    next();
  }
};

export const handleValidationsForUserSchema = (req, res, next) => {
  const { body } = req;
  const {
    first_name = "",
    last_name = "",
    password = "",
    username = "",
  } = body;

  if (
    first_name === "" ||
    last_name === "" ||
    password === "" ||
    username === ""
  ) {
    res.status(400).send();
  }

  // if password or username is not valid then we have to reject this request and return 400
  if (!ValidatePassword(password) || !ValidateEmailAddress(username)) {
    res.status(400).send();
  }

  next();
};
