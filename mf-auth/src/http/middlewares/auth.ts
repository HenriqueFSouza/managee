import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
export const confirmRegistrationAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('TOKEN', token)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('TOKEN DATA', decoded)
    req.registration = decoded as any;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ error: 'Access denied.' });
  }
  next();
};
