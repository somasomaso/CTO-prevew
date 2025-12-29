import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

export const requestLogger = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const user = req.user ? `${req.user.username} (${req.user.roles.join(', ')})` : 'Anonymous';
    
    console.log({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  });

  next();
};
