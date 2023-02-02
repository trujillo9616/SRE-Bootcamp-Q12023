import express, { Request } from 'express';
import morgan from 'morgan';
import { loginRouter, protectedRouter, healthRouter } from './routes';
import middleware from './utils/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Routes
app.use('/api/login', loginRouter);
app.use('/api/protected', protectedRouter);
app.use('/api/_health', healthRouter);

// Middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
