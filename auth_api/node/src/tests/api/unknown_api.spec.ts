import app from '../../server';
import supertest from 'supertest';
import 'mocha';
import { expect } from 'chai';

const api = supertest(app);

describe('Unknown Endpoint', function () {

  it('Should return an error when calling an unknown endpoint', async () => {
    const response = await api.post('/api/totallynotrealendpoint')
    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.a('string');
    expect(response.body.error).to.be.equal('unknown endpoint');
  });
});
