import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwtService';
import { JwtPayload } from '../models/interfaces';


declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'Access Denied: No token provided.' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(403).json({ message: 'Access Denied: Invalid or expired token.' });
    }
};