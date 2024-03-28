import User from "../../models/User/index.js";

export const findUserByUsername = async (username, res) => {
  try {
    const userDetails = await User.findOne({ where: { username } });
    return userDetails;
  } catch (e) {
    if (e.name == "SequelizeConnectionRefusedError") {
      res.status(503).send();
      return;
    }
    return null;
  }
};

export const createNewEntryForUser = async (requestBody) => {
  try {
    const newUser = await User.create(requestBody);
    return newUser;
  } catch (e) {
    console.log("Error in createNewEntryForUser", e);
    return null;
  }
};

export const findUserByUserId = async (userId, res) => {
  try {
    const userDetails = await User.findOne({ where: { id: userId } });
    return userDetails;
  } catch (e) {
    if (e.name == "SequelizeConnectionRefusedError") {
      res.status(503).send();
      return;
    }
    return null;
  }
};
