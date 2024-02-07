import express from "express";
import {
  handleRequestBodyForUserPostCall,
  handleWhiteListedKeysForUserPostCall,
  handleValidationsForUserSchema,
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

export default userRouter;
