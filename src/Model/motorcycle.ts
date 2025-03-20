import { Request, Response } from "express";
import db from "../config/config";

type Rental_status = "available" | "rented" | "maintenance"; // Fixed typo in "maintenance"

export interface Motorcycle {
    bike_id: number;
    make: string;
    model: string;
    bike_year: number;
    rental_rate_per_week: string;
    engine_cc: string;
    rental_status: Rental_status;
    owner_id: number;
}

export class Motorcycles {
    fetchMotorcycles(req: Request, res: Response): Response {
        const qry = `
        SELECT bike_id, make, model, bike_year, rental_rate_per_week, engine_cc, rental_status, owner_id
        FROM Motorcycles;
        `;
        db.query(qry, (err: any, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: res.statusCode, msg: "Failed to fetch motorcycles." });
            }
            return res.json({ status: res.statusCode, results });
        });
        return res; // Ensure TypeScript sees a return
    }

    fetchMotorcycle(req: Request, res: Response): Response {
        const qry = `
        SELECT bike_id, make, model, bike_year, rental_rate_per_week, engine_cc, rental_status, owner_id
        FROM Motorcycles
        WHERE bike_id = ${req.params.id};
        `;
        db.query(qry, (err: any, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: res.statusCode, msg: "Failed to fetch motorcycle." });
            }
            return res.json({ status: res.statusCode, result });
        });
        return res;
    }

    addMotorcycle(req: Request, res: Response): Response {
        const { owner_id } = req.body;
        if (!owner_id) {
            return res.status(400).json({ status: res.statusCode, msg: "Owner ID is required." });
        }

        const qry = `INSERT INTO Motorcycles SET ?;`;
        db.query(qry, [req.body], (err: any) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: res.statusCode, msg: "Failed to add motorcycle." });
            }
            return res.json({ status: res.statusCode, msg: "Motorcycle added successfully." });
        });
        return res;
    }

    updateMotorcycle(req: Request, res: Response): Response {
        const qry = `
        UPDATE Motorcycles
        SET ?
        WHERE bike_id = ${req.params.id};
        `;
        db.query(qry, [req.body], (err: any) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: res.statusCode, msg: "Failed to update motorcycle." });
            }
            return res.json({ status: res.statusCode, msg: "Motorcycle updated successfully." });
        });
        return res;
    }

    deleteMotorcycle(req: Request, res: Response): Response {
        const qry = `
        DELETE FROM Motorcycles
        WHERE bike_id = ${req.params.id};
        `;
        db.query(qry, (err: any) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: res.statusCode, msg: "Failed to delete motorcycle." });
            }
            return res.json({ status: res.statusCode, msg: "Motorcycle deleted successfully." });
        });
        return res;
    }
}
