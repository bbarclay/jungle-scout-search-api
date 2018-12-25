import express from 'express';
import nconf from 'nconf';
import { decorateApp } from '@awaitjs/express';

import log from './initializers/logger';
import initializers from './initializers';

const app = decorateApp(express());

initializers.nconf(); // Initializer nconf MUST be first
initializers.database(nconf);
initializers.server(app);

const server = app.listen(nconf.get('server:port'), () => {
  log.info(`environment ${nconf.get('environment')}`);
  log.info(`Server listening on ${server.address().port}`);
  process.send('ready');
});
