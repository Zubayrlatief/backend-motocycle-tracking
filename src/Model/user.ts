import { Request, Response } from "express";
import db from "../config/config";
import { hash, compare } from "bcrypt";
import { createToken } from "../middleware/authentication";


export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "driver" | "renter";
}

type UserResponse = Omit<User, 'password'>;

interface TokenPayload {
    email: string;
    password: string;
}

export class Users {
    fetchUsers(req: Request, res: Response): void {
        const qry =`
        SELECT id, firstName, lastName, email, role
        FROM Users;
        `;
        db.query(qry, (err: any, results: UserResponse[]) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }

    fetchUser(req: Request, res: Response): void {
        const qry = `
        SELECT id, firstName, lastName, email, role
        FROM Users
        WHERE id = ${req.params.id}
        `;
        db.query(qry, (err: any, result: UserResponse[]) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        });
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const data = req.body as Omit<User, "id">; //remove this line if the id column in the database is not auto-incremented.
        if(data.password) {
            data.password = await hash(data.password, 10);
        }
        const user: TokenPayload = {
            email: data.email,
            password: data.password
        };
        const qry = `
        INSERT INTO Users
        SET ?;
        `;
        db.query(qry, [data], (err: any) => {
            if (err) {
                res.json({
                    status: res.statusCode,
                    msg: "Please try again later."
                });
            } else {
                const token = createToken(user);
                res.json({
                    status: res.statusCode,
                    token,
                    msg: "Your account has been registered."
                });
            }
        });
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const data = req.body as Partial<Omit<User, 'id'>>;
        if (data.password) {
            data.password = await hash(data.password, 8);
        }
        const qry = `
        UPDATE Users
        SET ?
        WHERE id = ${req.params.id};
        `;
        db.query(qry, [data], (err: any) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "You have successfully updated your account."
            });
        });
    }

    deleteUser(req: Request, res: Response): void {
        const qry = `
        DELETE FROM Users
        WHERE id = ${req.params.id}
        `;
        db.query(qry, (err: any) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "Your account has been deleted."
            });
        });
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body as { email: string; password: string };
        const qry = `
        SELECT id, firstName, lastName, email, password, role
        FROM Users
        WHERE email = '${email}}';
        `;
        db.query(qry, async (err: any, result: User[]) => {
            if (err) throw err;
            if (!result?.length) {
                res.json({
                    status: res.statusCode,
                    msg: "Incorrect email address."
                });
            } else {
                const validPass = await compare(password, result[0].password);
                if (validPass) {
                    const token = createToken({ email, password });
                    res.json({
                        status: res.statusCode,
                        msg: "You have logged in successfully.",
                        token,
                        result: result[0]
                    });
                } else {
                    res.json({
                        status: res.statusCode,
                        msg: "Your password is incorrect."
                    });
                }
            }
        });
    }
}

