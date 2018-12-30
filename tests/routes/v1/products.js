import { errors } from 'celebrate';
import { expect } from 'chai';
import autoroute from 'express-autoroute';
import request from 'supertest';

import middlewares from '../../../middlewares';
import Product from '../../../models/Product';
import Application from '../../../models/Application';
import applicationScheme from '../../fixtures/v1/application';
import productScheme from '../../fixtures/v1/product';
import generator from '../../helpers/generator';

const createFakeApplication = async () => {
  const application = await Application.create(generator(applicationScheme));

  return application.get('apiKey');
};

describe('v1/products', () => {
  before(async () => {
    autoroute(global.app, {
      throwErrors: true,
      routeFile: rootPath('./routes/v1/products.js'),
    });

    global.app.use(errors());
    global.app.use(middlewares.errorHandler);
  });

  it('should break if X-API-TOKEN is not present', async () => {
    await request(global.app)
      .get('/products')
      .expect(401);
  });

  it('should break if no records exist in the collection', async () => {
    const apiKey = await createFakeApplication();

    await request(global.app)
      .get('/products')
      .set('X-API-KEY', apiKey)
      .expect(404);
  });

  it('should successfully respond with data', async () => {
    const apiKey = await createFakeApplication();

    const products = generator(productScheme, 5, 20);

    await Product.create(products);

    const response = await request(global.app)
      .get('/products')
      .set('X-API-KEY', apiKey)
      .expect(200);


    expect(response.body).to.have.length(products.length);
    expect(response.body[0]).to.have.property('category');
    expect(response.body[0]).to.have.property('dimensions');
    expect(response.body[0]).to.have.property('rank');
  });
});
