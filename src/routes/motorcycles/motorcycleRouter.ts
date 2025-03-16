import express, { Router } from "express";
import { getAllMotorcycles, getMotorcycleById, registerMotorcycle, updateMotorcycleById, deleteMotorcylceById } from "../../controllers/motorcycleController";

const motorcycleRouter: Router = express.Router();

motorcycleRouter.route("/")
.get(getAllMotorcycles)
.post(registerMotorcycle)

motorcycleRouter.route("/:id")
.get(getMotorcycleById)
.patch(updateMotorcycleById)
.delete(deleteMotorcylceById)

export {
    motorcycleRouter
}