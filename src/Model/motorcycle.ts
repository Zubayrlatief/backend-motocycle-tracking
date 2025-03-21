import { Request, Response } from "express";
import db from "../config/config";

// Define your types
type RentalStatus = "available" | "rented" | "maintenance"; 

export interface Motorcycle {
    bike_id: number;
    make: string;
    model: string;
    bike_year: number;
    rental_rate_per_week: number;  // Change this to a number
    engine_cc: string;
    rental_status: RentalStatus;
}

export class Motorcycles {

    fetchMotorcycles(req: Request, res: Response): Response {
        const qry = `SELECT bike_id, make, model, bike_year, rental_rate_per_week, engine_cc, rental_status FROM Motorcycles`;
        db.query(qry, (err: any, results: any) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: res.statusCode, msg: "Failed to fetch motorcycles." });
            }

            // Convert rental_rate_per_week to a number if it's returned as a string
            const motorcycles: Motorcycle[] = results.map((result: any) => ({
                bike_id: result.bike_id,
                make: result.make,
                model: result.model,
                bike_year: result.bike_year,
                rental_rate_per_week: parseFloat(result.rental_rate_per_week),  // Ensure it's a number
                engine_cc: result.engine_cc,
                rental_status: result.rental_status
            }));

            return res.json({ status: res.statusCode, results: motorcycles });
        });
        return res;
    }


    // This function fetches a motorcycle by ID
    fetchMotorcycle(req: Request, res: Response): Response {
        const qry = `SELECT bike_id, make, model, bike_year, rental_rate_per_week, engine_cc, rental_status FROM Motorcycles WHERE bike_id = ${req.params.id}`;
        db.query(qry, (err: any, result: any[]) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: res.statusCode, msg: "Failed to fetch motorcycle." });
            }

            // Map the result to the Motorcycle type
            const motorcycle: Motorcycle = result.length > 0 ? result[0] : null;

            if (!motorcycle) {
                return res.status(404).json({ status: res.statusCode, msg: "Motorcycle not found." });
            }

            return res.json({ status: res.statusCode, result: motorcycle });
        });

        return res; // Ensure a return value of type Response
    }
    
    addMotorcycle(req: Request, res: Response): Response {
        const { make, model, bike_year, rental_rate_per_week, engine_cc, rental_status } = req.body;

        if (!make || !model || !bike_year || !rental_rate_per_week || !engine_cc || !rental_status) {
            return res.status(400).json({ status: res.statusCode, msg: "All fields are required." });
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
