import jwt from 'jsonwebtoken';
import config from '../config/config';

export const protectFunction = (authorization: string) => {
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt_secret);
    if (!decoded || typeof decoded === 'string') {
      const error = new Error('Invalid token');
      error.name = 'InvalidTokenError';
      throw error;
    }
    return decoded;
  } catch (error) {
    throw error;
  }
}
