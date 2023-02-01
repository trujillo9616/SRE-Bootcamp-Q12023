import express, { Request } from 'express';
import morgan from 'morgan';
import * as routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
routes.init(app);

export default app;
