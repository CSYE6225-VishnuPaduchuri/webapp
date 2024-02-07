import {
  findUserByUsername,
  createNewEntryForUser,
} from "../../services/User/index.js";
import bcrypt from "bcrypt";

export const createNewUser = async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;

    const isExistingUser = await findUserByUsername(username);

    if (isExistingUser) {
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
        };

        res.status(201).send(responsebody);
      } else {
        res.status(500).send();
      }
    }
  } catch (e) {
    res.status(500).send();
  }
};

export const getUserDetails = (req, res) => {
  try {
    const userDetails = {
      id: req.authorizedUserObject.id,
      first_name: req.authorizedUserObject.first_name,
      last_name: req.authorizedUserObject.last_name,
      username: req.authorizedUserObject.username,
      account_created: req.authorizedUserObject.account_created,
      account_updated: req.authorizedUserObject.account_updated,
    };

    res.status(200).send(userDetails);
  } catch (e) {
    res.status(500).send();
  }
};
