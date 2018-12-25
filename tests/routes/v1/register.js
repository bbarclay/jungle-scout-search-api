import { errors } from 'celebrate';
import { expect } from 'chai';
import autoroute from 'express-autoroute';
import request from 'supertest';

import middlewares from '../../../middlewares';
import Application from '../../../models/Application';

describe('v1/register', () => {
  before(async () => {
    autoroute(global.app, {
      throwErrors: true,
      routeFile: rootPath('./routes/v1/register.js'),
    });

    global.app.use(errors());
    global.app.use(middlewares.errorHandler);
  });

  it('should break if name and description is not provided', async () => {
    await request(global.app)
      .post('/register')
      .expect(400);
  });

  it('should break if name is not provided', async () => {
    await request(global.app)
      .post('/register')
      .send({
        description: 'My Awsome APP',
      })
      .expect(400);
  });

  it('should break if description is not provided', async () => {
    await request(global.app)
      .post('/register')
      .send({
        name: 'My Awsome APP Name',
      })
      .expect(400);
  });

  it('should create api key and send it back', async () => {
    const response = await request(global.app)
      .post('/register')
      .send({
        name: 'My Awsome APP Name',
        description: 'My Awsome APP',
      })
      .expect(200);

    expect(response.body).to.have.property('apiKey');
    const application = await Application.findOne({ apiKey: response.body.apiKey });
    expect(application.get('apiKey')).to.not.equal(null);
  });
});
