import sequelize from "../../utils/database/sequelizeSetup.js";

export const TestDBConnection = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully!");
    res.status(200).send();
  } catch (e) {
    console.log("Unable to connect to the database!", e);
    res.status(503).send();
  }
};
