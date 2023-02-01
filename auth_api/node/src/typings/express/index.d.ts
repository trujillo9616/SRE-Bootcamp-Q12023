declare namespace Express {
  interface Request {
    token?: string;
    user?: string | object | null;
  }
}
