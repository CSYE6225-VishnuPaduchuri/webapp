import User from "../../models/User/index.js";

export const findUserByUsername = async (username) => {
  try {
    const userDetails = await User.findOne({ where: { username } });
    return userDetails;
  } catch (e) {
    console.log("Error in findUserByUsername function", e);
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
