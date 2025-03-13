import { Request, Response } from "express";
import { users } from "../Model/model";

export const getAllUsers = (req: Request, res: Response): void => {
    try{
        users.fetchUsers(req, res);
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve all users."
        });
    }
};

export const getUserById = (req: Request, res: Response): void => {
    try {
        users.fetchUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve user."
        });
    }
};

export const signupUser = (req: Request, res: Response): void => {
    try {
        users.createUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to add user."
        });
    }
};

export const updateUserById = (req: Request, res: Response): void => {
    try {
        users.updateUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to update user."
        });
    }
};

export const deleteUserById = (req: Request, res: Response): void => {
    try {
        users.deleteUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to delete user."
        });
    }
};

export const loginUser = (req: Request, res: Response): void => {
    try {
        users.login(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to login."
        });
    }
};