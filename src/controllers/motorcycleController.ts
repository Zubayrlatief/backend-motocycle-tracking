import { Request, Response } from "express";
import { motorcycles } from "../Model/model";

export const getAllMotorcycles = (req: Request, res:Response): void => {
    try{
        motorcycles.fetchMotorcycles(req, res);
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve motorcycles."
        });
    }
};

export const getMotorcycleById = (req: Request, res: Response): void => {
    try{
        motorcycles.fetchMotorcycle(req, res);
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve motorcycle."
        });
    }
};

export const registerMotorcycle = (req: Request, res: Response): void => {
    try{
        motorcycles.addMotorcycle(req, res);
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to add a motorcycle."
        });
    }
};

export const updateMotorcycleById = (req: Request, res: Response): void => {
    try{
        motorcycles.updateMotorcycle(req, res);
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to update motorcycle."
        });
    }
};

export const deleteMotorcylceById = (req: Request, res: Response): void => {
    try{
        motorcycles.deleteMotorcylce(req, res);
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to delete motorcycle."
        })
    }
};