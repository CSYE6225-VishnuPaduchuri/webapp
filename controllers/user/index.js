import {
  findUserByUsername,
  createNewEntryForUser,
} from "../../services/User/index.js";
import bcrypt from "bcrypt";
import { customLogger } from "../../app/index.js";
import publishMessageToTopic from "../../utils/pubsub/index.js";

export const createNewUser = async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;

    customLogger.debug("Received request to create new user", {
      payload: {
        firstName: first_name,
        lastName: last_name,
        username: username,
      },
    });

    const isExistingUser = await findUserByUsername(username, res);

    if (isExistingUser) {
      // we arre logging the username here so that we can track in google cloud
      customLogger.warn("User already exists!", { username: username });
      // if user already exists then we have to return 409
      // 409 means conflict
      res.status(409).send();
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const requestBody = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: hashedPassword,
        isUserVerified: false,
      };

      const newUser = await createNewEntryForUser(requestBody);

      if (newUser != null) {
        const responsebody = {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          username: newUser.username,
          account_created: newUser.account_created,
          account_updated: newUser.account_updated,
          isUserVerified: newUser.isUserVerified,
        };
        customLogger.info("User created successfully!");

        const pubsubBody = {
          username: newUser.username,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          id: newUser.id,
        };

        await publishMessageToTopic(pubsubBody);

        res.status(201).send(responsebody);
      }
    }
  } catch (e) {
    if (e.name == "SequelizeConnectionRefusedError") {
      customLogger.error("Unable to connect to the database!", { error: e });
      res.status(503).send();
      return;
    } else {
      customLogger.error("Internal Server Error!", { error: e });
      res.status(500).send();
    }
  }
};

export const getUserDetails = (req, res) => {
  try {
    // we are logging the username here so that we can track in google cloud
    customLogger.debug("Received request to get user details", {
      payload: {
        username: req.authorizedUserObject.username,
      },
    });

    const userDetails = {
      id: req.authorizedUserObject.id,
      first_name: req.authorizedUserObject.first_name,
      last_name: req.authorizedUserObject.last_name,
      username: req.authorizedUserObject.username,
      account_created: req.authorizedUserObject.account_created,
      account_updated: req.authorizedUserObject.account_updated,
      isUserVerified: req.authorizedUserObject.isUserVerified,
    };

    customLogger.info("User details fetched successfully!");
    res.status(200).send(userDetails);
  } catch (e) {
    customLogger.error("Internal Server Error when fetching User Details!", {
      error: e,
    });
    res.status(500).send();
  }
};

export const updateUserDetails = async (req, res) => {
  const requestOject = {};

  try {
    const { body, authorizedUserObject } = req;

    // checking if body has first_name, then adding it to
    // the request object key
    // this is done for first_name, last_name and password
    // as we want to update only fields that user has given to us

    if (body.hasOwnProperty("first_name")) {
      if (body["first_name"].length == 0) {
        customLogger.error("User has sent empty first name for update!");
        res.status(400).send();
        return;
      }
      requestOject["first_name"] = body["first_name"];
    }

    if (body.hasOwnProperty("last_name")) {
      if (body["last_name"].length == 0) {
        customLogger.error("User has sent empty last name for update!");
        res.status(400).send();
        return;
      }
      requestOject["last_name"] = body["last_name"];
    }

    if (body.hasOwnProperty("password")) {
      const hashedPassword = await bcrypt.hash(body["password"], 10);
      requestOject["password"] = hashedPassword;
    }

    await authorizedUserObject.update(requestOject);
    customLogger.info("User details updated successfully!");
    res.status(204).send();
  } catch (e) {
    if (e.name == "SequelizeConnectionRefusedError") {
      customLogger.error("Unable to connect to the database!", { error: e });
      res.status(503).send();
      return;
    }
    customLogger.error("Internal Server Error when updating User Details!", {
      error: e,
    });
    res.status(500).send();
  }
};

export const verifyLink = async (req, res) => {
  try {
    const { query } = req;
    const { email } = query;
    const userDetails = await findUserByUsername(email, res);

    if (userDetails == null) {
      customLogger.error("User not found!", { email });
      res.status(404).send();
      return;
    }

    if (userDetails.isUserVerified) {
      customLogger.warn("User already verified!", { email });
      res.status(409).send();
      return;
    }

    const getCurrentTimeStamp = new Date();

    const verificationTimeStamp = new Date(
      userDetails.verificationMailTimeStamp
    );

    if (
      getCurrentTimeStamp.getTime() - verificationTimeStamp.getTime() >
      120000
    ) {
      customLogger.error("Verification link expired!", { email });
      res.status(403).send();
      return;
    }

    await userDetails.update({ isUserVerified: true });
    customLogger.info("User Verified successfully!");
    res.status(204).send();
  } catch (e) {
    if (e.name == "SequelizeConnectionRefusedError") {
      customLogger.error("Unable to connect to the database!", { error: e });
      res.status(503).send();
      return;
    }
    customLogger.error("Internal Server Error when updating User Details!", {
      error: e,
    });
    res.status(500).send();
  }
};
