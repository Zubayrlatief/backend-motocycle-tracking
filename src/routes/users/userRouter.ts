import express,{ Router } from "express";
import { getAllUsers, getUserById, signupUser, updateUserById, deleteUserById } from "../../controllers/userController";

const userRouter: Router = express.Router();

userRouter.route("/")
.get(getAllUsers)
.post(signupUser)

userRouter.route("/:id")
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById)

export {
    userRouter
}
