// src/lib/jwtService.ts
import jwt from "jsonwebtoken";
import { JwtPayload } from "../models/interfaces";
import dotenv from "dotenv";
import { Secret, SignOptions } from "jsonwebtoken"; 

dotenv.config(); 

const JWT_SECRET: Secret = process.env.JWT_SECRET || "supersecretjwtkeythatshouldbeverylongandrandom";

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';


export const generateToken = (payload: JwtPayload): string => {
    const options: SignOptions = {
        expiresIn: JWT_EXPIRATION as SignOptions['expiresIn']
    };
    return jwt.sign(payload, JWT_SECRET, options);
};


export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

