import express from "express";
import authController from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import { userSignupSchema, userSigninSchema } from "../schemas/usersSchemas.js";
//import { schemas } from "../models/user.js";
import authenticate from "../middlewares/authenticate.js";
const route = express.Router();

route.post("/register", validateBody(userSignupSchema), authController.signup);
route.post("/login", validateBody(userSigninSchema), authController.signin);
route.get("/current", authenticate, authController.getCurrent);
route.post("/logout", authenticate, authController.signout);

export default route; 
