import express,{ Router } from "express";
import { loginUser } from "../../controllers/userController";

const loginRouter: Router = express.Router();

loginRouter.route("/").post(loginUser)

export {
    loginRouter
}