import express from "express";
import {
  handleRequestBodyForUserPostCall,
  handleWhiteListedKeysForUserPostCall,
  handleValidationsForUserSchema,
  handleParamsAndBody,
  handleBaseAuth,
} from "../../middleware/queryAndBodyCheck.js";
import Controller from "../../controllers/index.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .delete(Controller.CommonController.MethodNotSupported)
  .patch(Controller.CommonController.MethodNotSupported)
  .head(Controller.CommonController.MethodNotSupported)
  .options(Controller.CommonController.MethodNotSupported);

userRouter
  .route("/")
  .post(
    handleRequestBodyForUserPostCall,
    handleWhiteListedKeysForUserPostCall,
    handleValidationsForUserSchema,
    Controller.UserController.createNewUser
  );

userRouter
  .route("/")
  .get(
    handleParamsAndBody,
    handleBaseAuth,
    Controller.UserController.getUserDetails
  );

export default userRouter;
