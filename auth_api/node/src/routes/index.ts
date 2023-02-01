import { Application } from 'express';
import { login } from './login';
import { protect } from './protected';
import { health } from '../services/health';


export const init = (app: Application) => {
  app.post('/api/login', login);
  app.get('/api/protected', protect);
  app.get('/api/_health', health);
};
