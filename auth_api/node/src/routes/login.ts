import express, { Request, Response, NextFunction } from 'express';
import { loginFunction } from '../services/login';

const loginRouter = express.Router();

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(403).send({ error: 'Username and password are required' });
    }

    let response = {
      "token": await loginFunction(username, password)
    };

    return res.send(response);
  } catch (error) {
    return next(error);
  }
})

export default loginRouter;
