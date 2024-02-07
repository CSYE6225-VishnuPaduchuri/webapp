import {
  ValidateEmailAddress,
  ValidatePassword,
} from "../utils/common/index.js";
import User from "../models/User/index.js";
import bcrypt from "bcrypt";

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

export const handleBaseAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).send();
  }

  try {
    // Reference taken from https://www.geeksforgeeks.org/basic-authentication-in-node-js-using-http-header/
    const authorizationInfo = req.headers.authorization.split(" ");

    // Adding check only for when the authorization header is not Basic
    if (authorizationInfo && authorizationInfo[0] !== "Basic") {
      res.status(400).send();
    }

    const authCredentials = authorizationInfo && authorizationInfo[1];

    const credentials = Buffer.from(authCredentials, "base64").toString(
      "ascii"
    );

    const userCredentials = credentials.split(":");

    const userName = userCredentials[0];
    const password = userCredentials[1];

    // if userName or password is empty then we have to throw 401
    // empty value are to be considered as invalid credentials
    // Reference https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#access_forbidden
    if (!userName || !password) {
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(401).send();
    }

    if (!ValidateEmailAddress(userName)) {
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(400).send();
    }

    const checkUserCredentials = await User.findOne({
      where: { username: userName },
    });

    if (checkUserCredentials == null) {
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(401).send();
    }

    // we are comparing the password of the request and the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      checkUserCredentials.password
    );

    if (isPasswordValid) {
      // We will append the user data to authorizedUserObject
      // and return it from controller
      req.authorizedUserObject = checkUserCredentials;
      next();
    } else {
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(401).send();
    }
  } catch (e) {
    res.status(500).send();
  }
};

export const handleParamsAndBodyForPut = (req, res, next) => {
  const { body, query, url } = req;

  const queryParams = Object.keys(query);
  const bodyJson = Object.keys(body);

  if (queryParams.length > 0 || url.includes("?")) {
    res.status(400).send();
  }

  if (
    bodyJson.length === 0 ||
    (req.headers["content-type"] &&
      req.headers["content-type"] !== "application/json")
  ) {
    res.status(400).send();
  }

  const whiteListedFields = ["first_name", "last_name", "password"];

  // In this filter, as long as PUT payload has one of the
  // whitelistedFields and no other fields, then it will be allowed to process
  const unwantedKeys = bodyJson.filter(
    (key) => !whiteListedFields.includes(key)
  );

  if (unwantedKeys.length > 0) {
    res.status(400).send();
  }

  const { password, first_name, last_name } = body;

  // Adding this check to see if the request has any of the keys
  // if it has the key, we have to check if its string or not
  if (body.hasOwnProperty("password")) {
    if (typeof password !== "string") {
      res.status(400).send();
    }

    if (!ValidatePassword(password)) {
      res.status(400).send();
    }
  }

  if (body.hasOwnProperty("first_name")) {
    if (typeof first_name !== "string") {
      res.status(400).send();
    }
  }

  if (body.hasOwnProperty("last_name")) {
    if (typeof last_name !== "string") {
      res.status(400).send();
    }
  }

  // if there are no unwanted keys, then we can process this request
  if (unwantedKeys.length === 0) {
    next();
  }
};
