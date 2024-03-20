import express from "express";
import {
  handleRequestBodyForUserPostCall,
  handleWhiteListedKeysForUserPostCall,
  handleValidationsForUserSchema,
  handleParamsAndBody,
  handleBaseAuth,
  handleParamsAndBodyForPut,
} from "../../middleware/queryAndBodyCheck.js";
import Controller from "../../controllers/index.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .delete(Controller.CommonController.MethodNotSupported)
  .patch(Controller.CommonController.MethodNotSupported)
  .head(Controller.CommonController.MethodNotSupported)
  .get(Controller.CommonController.MethodNotSupported)
  .put(Controller.CommonController.MethodNotSupported)
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
  .route("/self")
  .delete(Controller.CommonController.MethodNotSupported)
  .patch(Controller.CommonController.MethodNotSupported)
  .head(Controller.CommonController.MethodNotSupported)
  .post(Controller.CommonController.MethodNotSupported)
  .options(Controller.CommonController.MethodNotSupported);

userRouter
  .route("/self")
  .get(
    handleParamsAndBody,
    handleBaseAuth,
    Controller.UserController.getUserDetails
  );

userRouter
  .route("/self")
  .put(
    handleParamsAndBodyForPut,
    handleBaseAuth,
    Controller.UserController.updateUserDetails
  );

export default userRouter;
