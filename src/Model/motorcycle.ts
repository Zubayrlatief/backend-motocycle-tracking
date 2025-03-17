import { Request, Response } from "express";
import db from "../config/config";
import { error } from "console";

type Rental_status = "available" | "rented" | "maintainance";

export interface Motorcycle {
    bike_id: number;
    make: string;
    model: string;
    bike_year: number;
    rental_rate_per_week: string;
    engine_cc: string;
    rental_status: Rental_status;
    owner_id: number
}

export class Motorcycles {
    fetchMotorcycles(req: Request, res: Response): void {
        const qry =`
        SELECT bike_id, make, model, bike_year, rental_rate_per_week, engine_cc, rental_status, owner_id
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

    fetchMotorcycle(req: Request, res: Response): void {
        const qry =`
        SELECT bike_id, make, model, bike_year, rental_rate_per_week, engine_cc, rental_status, owner_id
        FROM Motorcycles
        WHERE bike_id = ${req.params.id};
        `;
        db.query(qry, (err: any, result) => {
            if(err) throw err;
            res.json({
                status: res.statusCode,
                result
            })
        })
    }

    addMotorcycle(req: Request, res: Response): void {
        const qry=`
        INSERT INTO Motorcycles
        SET ?;
        `;
        db.query(qry, [req.body], (err: any) => {
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Motorcycle added successfully."
            })
        })
    }

    updateMotorcycle(req: Request, res: Response): void {
        const qry =`
        UPDATE Motorcycles
        SET ?
        WHERE bike_id = ${req.params.id};
        `;
        db.query(qry,[req.body], (err: any) => {
            if(err) throw err;
            res.json({
                status: res.statusCode,
                msg: "Motorcycle updated successfully."
            })
        })
    }

    deleteMotorcycle(req: Request, res: Response): void {
        const qry=`
        DELETE FROM Motorcycles
        WHERE bike_id = ${req.params.id};
        `;
        db.query(qry, [req.body], (err: any) => {
            if(err) throw err;
            res.json({
                status: res.statusCode,
                msg: "Motorcycle deleted successfully."
            })
        })
    }
}