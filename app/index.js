import express from "express";
import registerRoutes from "../routes/index.js";
import { setHeadersAtGloablLevel } from "../middleware/globalHeaders.js";
import sequelize from "../utils/database/sequelizeSetup.js";
import winston from "winston";

// Chose winston for logging based on the following reasons:
// https://betterstack.com/community/guides/logging/best-nodejs-logging-libraries/
// Most downloaded logging libarary for nodejs

// Reference from https://www.npmjs.com/package/winston#installation
export const customLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "webapp-backend" },
  transports: [
    new winston.transports.File({ filename: "webapp.log", level: "silly" }),
    new winston.transports.Console(),
  ],
});

const setUpDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    customLogger.info(
      "Database Connection has been established successfully and Tables have been created!"
    );
  } catch (e) {
    customLogger.error("Failed to connect to the database", { error: e });
  }
};

const initialize = (server) => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(setHeadersAtGloablLevel);

  //  Initialise routes
  registerRoutes(server);

  setUpDatabase();
};

export default initialize;
