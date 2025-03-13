import express,{ Router } from "express";
import { getAllUsers, getUserById, signupUser, updateUserById, deleteUserById, loginUser } from "../../controllers/userController";

const userRouter: Router = express.Router();

userRouter.route("/")
.get(getAllUsers)
.post(signupUser)
.post(loginUser)

userRouter.route("/:id")
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById)

export {
    userRouter
}
