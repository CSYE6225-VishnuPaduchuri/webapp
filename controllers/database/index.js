import sequelize from "../../utils/database/sequelizeSetup.js";
import { customLogger } from "../../app/index.js";

export const TestDBConnection = async (req, res) => {
  try {
    customLogger.info("Received healthz request");
    await sequelize.authenticate();
    customLogger.info("Database Connection has been established successfully!");
    res.status(200).send();
  } catch (e) {
    customLogger.error("Unable to connect to the database!", { error: e });
    res.status(503).send();
  }
};
