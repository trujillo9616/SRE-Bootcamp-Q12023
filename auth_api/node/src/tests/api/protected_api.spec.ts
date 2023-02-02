import app from '../../server';
import supertest from 'supertest';
import 'mocha';
import { expect } from 'chai';

import { mockUser } from '../mock';

const api = supertest(app);

describe('Protected Endpoint', function () {

  it('Should fail with no token', async () => {
    const response = await api.get('/api/protected');
    expect(response.status).to.be.equal(401);
  });

  it('Should fail with invalid token', async () => {
    const authResponse = await api.get('/api/protected').set('Authorization', `Bearer invalidToken`);
    expect(authResponse.status).to.be.equal(401);
    expect(authResponse.body).to.have.property('error');
    expect(authResponse.body.error).to.be.a('string');
    expect(authResponse.body.error).to.be.equal('invalid token');
  });

  it('Should pass with valid token', async () => {
    const response = await api.post('/api/login').send({
      username: mockUser.username,
      password: mockUser.password
    });
    expect(response.status).to.be.equal(200);

    const authResponse = await api.get('/api/protected').set('Authorization', `Bearer ${response.body.token}`);
    expect(authResponse.status).to.be.equal(200);
    expect(authResponse.body).to.have.property('data');
    expect(authResponse.body.data).to.be.a('string');
    expect(authResponse.body.data).to.be.equal(`You are under protected data, ${mockUser.username} with role ${mockUser.role}!`);
  });
});
