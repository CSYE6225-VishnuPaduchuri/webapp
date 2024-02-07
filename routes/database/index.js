import express from "express";
import Controller from "../../controllers/index.js";
import { handleParamsAndBody } from "../../middleware/queryAndBodyCheck.js";

const databaseRouter = express.Router();

databaseRouter
  .route("/")
  .post(Controller.CommonController.MethodNotSupported)
  .delete(Controller.CommonController.MethodNotSupported)
  .patch(Controller.CommonController.MethodNotSupported)
  .put(Controller.CommonController.MethodNotSupported)
  .head(Controller.CommonController.MethodNotSupported)
  .options(Controller.CommonController.MethodNotSupported);

databaseRouter
  .route("/")
  .get(handleParamsAndBody, Controller.DatabaseController.TestDBConnection);

export default databaseRouter;
