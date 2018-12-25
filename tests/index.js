import nconf from 'nconf';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { decorateApp } from '@awaitjs/express';

import initializers from '../initializers';

initializers.nconf();

before(() => {
  global.app = decorateApp(express());

  global.app.use(bodyParser.json({ type: 'application/json' }));
  global.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  global.httpServer = http.createServer(global.app).listen(56773);
});

beforeEach(async () => {
  await initializers.database(nconf);
  await mongoose.connection.db.dropDatabase();
});

afterEach(() => mongoose.connection.close());

after((done) => {
  mongoose.connection.close();
  global.httpServer.close(done);
});
