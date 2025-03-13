import "dotenv/config"
import { Request, Response, NextFunction } from "express";
import { sign, verify, JwtPayload } from "jsonwebtoken";

interface TokenUser {
  email: string;
  password: string;
}

const SECRET_KEY = process.env.SECRET_KEY as string;

function createToken(user: TokenUser): string {
  return sign(
    {
      email: user.email,
      password: user.password
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );
}

function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const token = req?.headers["authorization"] as string | undefined;
  if(token) {
    try {
      const decoded = verify(token, SECRET_KEY) as JwtPayload;
      next()
    } catch (error) {
      res.status(401).json({
        status: 401,
        msg: "Your login details are incorrect."
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      msg: "Please Log In."
    });
  }
}

export {
  createToken,
  verifyToken
}

