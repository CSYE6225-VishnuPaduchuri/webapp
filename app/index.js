import express from "express";
import registerRoutes from "../routes/index.js";
import { setHeadersAtGloablLevel } from "../middleware/globalHeaders.js";

const initialize = (server) => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(setHeadersAtGloablLevel);

  //  Initialise routes
  registerRoutes(server);
};

export default initialize;
