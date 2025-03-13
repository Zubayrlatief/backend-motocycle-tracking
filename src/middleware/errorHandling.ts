import { Request, Response, NextFunction } from "express";

function errorHandling(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (err) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({
            status: statusCode,
            msg: err.message || "Internal Server Error."
        });
    } else {
        next();
    }
}

export { 
    errorHandling 
};