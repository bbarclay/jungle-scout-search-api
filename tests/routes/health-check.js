import request from 'supertest';
import autoroute from 'express-autoroute';

describe('health check', () => {
  before(() => {
    autoroute(global.app, {
      throwErrors: true,
      routeFile: rootPath('./routes/health-check.js'),
    });
  });

  it('should respond with status 200', async () => {
    await request(global.app)
      .get('/')
      .expect(200);
  });
});
