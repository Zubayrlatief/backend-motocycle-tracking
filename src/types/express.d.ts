// src/types/express.d.ts
import { User } from "../model/user"; // Adjust the import path to your User model

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property to the Request type
    }
  }
}