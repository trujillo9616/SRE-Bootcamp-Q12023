import { Request, Response, NextFunction } from 'express';

export const health = (_req: Request, res: Response, next: NextFunction) => {
    res.send('OK');
    next();
}
