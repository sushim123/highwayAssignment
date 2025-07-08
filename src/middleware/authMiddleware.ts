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
    const token = req.cookies.jwt; 

    if (token == null) {
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader && authHeader.split(' ')[1];
        if (bearerToken == null) {
            return res.status(401).json({ message: 'Access Denied: No token provided.' });
        }
        try {
            const decoded = verifyToken(bearerToken);
            req.user = decoded;
            return next();
        } catch (error) {
            console.error('JWT verification failed (Bearer token):', error);
            return res.status(403).json({ message: 'Access Denied: Invalid or expired token.' });
        }
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification failed (Cookie token):', error);
        return res.status(403).json({ message: 'Access Denied: Invalid or expired token.' });
    }
};
