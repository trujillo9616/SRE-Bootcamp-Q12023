import { Request, Response, NextFunction } from 'express';
import { protectFunction } from '../services/protected';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.header('Authorization')?.split(' ')[1];

  if (!authToken) {
    return res.status(401).send({ error: 'Authorization header is required' });
  }

  let response = {
    "data": protectFunction(authToken)
  };
  res.send(response);
  return next();
}
