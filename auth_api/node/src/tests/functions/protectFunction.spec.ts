import 'mocha';
import { expect } from 'chai';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { loginFunction } from '../../services/login';
import config from '../../config/config';

import { mockUser } from '../mock';

describe('Protected Function', function () {

  it('Should generate a valid jwt token', async () => {
    const token = await loginFunction(mockUser.username, mockUser.password);
    expect(token).to.be.a('string');
    const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
    expect(decoded).to.have.property('role');
    expect(decoded).to.have.property('username');
    expect(decoded.username).to.be.equal(mockUser.username);
    expect(decoded.role).to.be.equal(mockUser.role);
  });

  it('The token should expire and become invalid', async () => {
    const token = await loginFunction(mockUser.username, mockUser.password, '1ms');
    expect(token).to.be.a('string');
    try {
      const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
      expect(decoded).to.be.equal(null);
    } catch (error) {
      expect(error.name).to.be.equal('TokenExpiredError');
    }
  });
});
