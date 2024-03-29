import { errors } from 'celebrate';
import { expect } from 'chai';
import autoroute from 'express-autoroute';
import request from 'supertest';
import nock from 'nock';
import fs from 'fs';

import middlewares from '../../../middlewares';
import Product from '../../../models/Product';
import Application from '../../../models/Application';
import applicationScheme from '../../fixtures/v1/application';
import generator from '../../helpers/generator';

const createFakeApplication = async () => {
  const application = await Application.create(generator(applicationScheme));

  return application.get('apiKey');
};

describe('v1/search', () => {
  before(async () => {
    autoroute(global.app, {
      throwErrors: true,
      routeFile: rootPath('./routes/v1/search.js'),
    });

    global.app.use(errors());
    global.app.use(middlewares.errorHandler);
  });

  it('should break if X-API-TOKEN is not present', async () => {
    await request(global.app)
      .get('/search')
      .expect(401);
  });

  it('should break if url parameters are not provided', async () => {
    const apiKey = await createFakeApplication();
    await request(global.app)
      .get('/search')
      .set('X-API-KEY', apiKey)
      .expect(400);
  });

  it('should successfully respond with parsed data', async () => {
    const apiKey = await createFakeApplication();
    const asin = 'B002QYW8LW';

    nock('https://www.amazon.com')
      .get(`/dp/${asin}`)
      .reply(200, await fs.readFileSync('tests/fixtures/v1/search.html'));

    const response = await request(global.app)
      .get(`/search?asin=${asin}`)
      .set('X-API-KEY', apiKey)
      .expect(200);

    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('dimensions');
    expect(response.body).to.have.property('rank');

    const searchRecord = await Product.findOne({ asin });

    expect(searchRecord).to.have.property('asin', asin.toLowerCase());
  });
});
