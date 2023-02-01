import { Request, Response, NextFunction } from 'express';
import { loginFunction } from '../services/login';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ error: 'Username and password are required' });
  }

  let response = {
    "data": loginFunction(username, password)
  };
  res.send(response);
  next();
}
