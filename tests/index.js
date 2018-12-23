import nconf from 'nconf';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import initializers from '../initializers';

initializers.nconf();

before(() => {
  global.app = express();

  global.app.use(bodyParser.json({ type: 'application/json' }));
  global.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  global.httpServer = http.createServer(global.app).listen(56773);
});


after((done) => {
  global.httpServer.close(done);
});
