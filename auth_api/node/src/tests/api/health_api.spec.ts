import app from '../../server';
import supertest from 'supertest';
import 'mocha';
import { expect } from 'chai';

const api = supertest(app);

describe('Health Endpoint', function () {

  it('Should return OK status', async () => {
    const response = await api.get('/api/_health');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('status');
    expect(response.body.status).to.be.a('string');
    expect(response.body.status).to.be.equal('OK');
  });
});
