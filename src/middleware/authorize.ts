import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  type: 'candidate' | 'recruiter';
}

export const authorize = (role: 'candidate' | 'recruiter') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      if (decoded.type !== role) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};
