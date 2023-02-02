import app from '../../server';
import supertest from 'supertest';
import 'mocha';
import { expect } from 'chai';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config/config';

import { mockUser } from '../mock';



const api = supertest(app);

describe('Login Endpoint', function () {

  it('Login failed', async () => {
    const response = await api.post('/api/login').send({
      username: mockUser.username,
      password: 'wrongPassword'
    });
    expect(response.status).to.be.equal(403);
  });

  it('Login succeds', async () => {
    const response = await api.post('/api/login').send({
      username: mockUser.username,
      password: mockUser.password
    });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.be.a('string');

    const decodeToken = jwt.verify(response.body.token, config.jwt_secret) as JwtPayload;
    expect(decodeToken).to.have.property('role');
    expect(decodeToken).to.have.property('username');
    expect(decodeToken.username).to.be.equal(mockUser.username);
    expect(decodeToken.role).to.be.equal(mockUser.role);
  });
});
