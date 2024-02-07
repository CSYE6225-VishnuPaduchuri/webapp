import express from "express";
import registerRoutes from "../routes/index.js";
import { setHeadersAtGloablLevel } from "../middleware/globalHeaders.js";
import sequelize from "../utils/database/sequelizeSetup.js";

const setUpDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log(
      "Database Connection has been established successfully and Tables have been created!"
    );
  } catch (e) {
    console.log("Unable to connect to the database!", e);
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
