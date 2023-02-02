import express, { Request, Response, NextFunction } from 'express';
import { protectFunction } from '../services/protected';

const protectedRouter = express.Router();

protectedRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.header('Authorization');
    if (!authToken) {
      return res.status(401).send({ error: 'Authorization header is required' });
    }

    const userData = protectFunction(authToken);
    let response = {
      "data": `You are under protected data, ${userData.username} with role ${userData.role}!`
    };

    return res.send(response);
  } catch (error) {
    return next(error);
  }
});

export default protectedRouter;
