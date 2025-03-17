import express, { Router } from "express";
import { getAllMotorcycles, getMotorcycleById, registerMotorcycle, updateMotorcycleById, deleteMotorcycleById } from "../../controllers/motorcycleController";

const motorcycleRouter: Router = express.Router();

motorcycleRouter.route("/")
.get(getAllMotorcycles)
.post(registerMotorcycle)

motorcycleRouter.route("/:id")
.get(getMotorcycleById)
.patch(updateMotorcycleById)
.delete(deleteMotorcycleById)

export {
    motorcycleRouter
}