import { prisma } from '../utils/prisma';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import exclude from '../utils/helper';
import config from '../config/config';

export const loginFunction = async (username: string, password: string, expiration?: string) => {
  expiration = expiration || '1h';
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      }
    });

    if (!user) {
      const error = new Error('User not found, please check your username.');
      error.name = 'UserNotFound';
      throw error;
    }

    const hash = crypto.createHash('sha512')
      .update(password + user.salt!)
      .digest('hex');

    if (hash !== user.password) {
      const error = new Error('Invalid password, please check your password.');
      error.name = 'InvalidPassword';
      throw error;
    }

    const data = exclude(user, ['password', 'salt']);
    const token = jwt.sign(data, config.jwt_secret, { expiresIn: expiration });
    return token;

  } catch (error) {
    throw error;
  }
}
