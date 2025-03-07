import express, { Request, Response } from "express";
import db from "./database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";

dotenv.config();
const router = express.Router();

// Define User interface
interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "driver" | "renter";
}

// Register User
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password, role }: User = req.body;

  // Validate role
  if (!["driver", "renter"].includes(role)) {
    res.status(400).json({ message: "Invalid role" });
    return;
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)";

    db.query(
      sql,
      [firstName, lastName, email, hashedPassword, role],
      (err) => {
        if (err) {
          res.status(500).json({ error: (err as Error).message });
          return;
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Login User
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      res.status(500).json({ error: (err as Error).message });
      return;
    }

    // Cast results as an array of RowDataPacket, then map to User type
    const users = results as RowDataPacket[];

    if (users.length === 0) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // We can safely assume the first user is the one we need
    const user: User = {
      id: users[0].id,
      firstName: users[0].firstName,
      lastName: users[0].lastName,
      email: users[0].email,
      password: users[0].password,
      role: users[0].role,
    };

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  });
});

export default router;
