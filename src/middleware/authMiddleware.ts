import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/user"; // Adjust the import path to your User model

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

// Interface for the token payload
interface TokenPayload {
  email: string;
  password: string;
  role?: "driver" | "renter"; // Add role if needed
}

// Utility function to create a token
function createToken(user: TokenPayload): string {
  return sign(
    {
      email: user.email,
      password: user.password,
      role: user.role // Include role if needed
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );
}

// Middleware to verify the token
function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["authorization"] as string | undefined;

  if (token) {
    try {
      const decoded = verify(token, SECRET_KEY) as TokenPayload; // Use TokenPayload type here
      req.user = decoded as User; // This should now work without TypeScript errors

      // Optional: Add role-based access control
      if (decoded.role === "renter") {
        return next(); // If the user is a renter, proceed
      } else {
        res.status(403).json({
          msg: "Access denied. Only renters can perform this action."
        });
      }
    } catch (error) {
      res.status(401).json({
        msg: "Invalid or expired token."
      });
    }
  } else {
    res.status(401).json({
      msg: "Please log in."
    });
  }
}

export { createToken, verifyToken };