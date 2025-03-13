import { Request, Response } from "express";
import db from "../config/config";

export interface Motorcycle {
    bike_id: number;
    owner_id: number;
    make: string;
    model: string;
    vin: string;
    rental_rate: string;
}

export class Motorcycles {
    fetchMotorcycles(req: Request, res: Response): void {
        const qry =`
        SELECT bike_id, owner_id, make, model, vin, rental_rate
        FROM Motorcycles;
        `;
        db.query(qry, (err: any, results) => {
            if(err) throw err;
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
}