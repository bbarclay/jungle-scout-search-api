import { errors } from 'celebrate';
import { expect } from 'chai';
import autoroute from 'express-autoroute';
import request from 'supertest';
import nock from 'nock';
import fs from 'fs';

import middlewares from '../../../middlewares';
import Search from '../../../models/Search';
import Application from '../../../models/Application';
import fakeApplication from '../../fixtures/v1/application';

const createFakeApplication = async () => {
  const application = await Application.create(fakeApplication);

  return application.get('apiKey');
};

describe.only('v1/search', () => {
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

  it('should break if url parameters ar not provided', async () => {
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

    const searchRecord = await Search.findOne({ asin });

    expect(searchRecord).to.have.property('asin', asin.toLowerCase());
  });
});
