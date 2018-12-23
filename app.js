import express from 'express';
import nconf from 'nconf';
import winston from 'winston';
import initializers from './initializers';

const app = express();

initializers.nconf(); // Initializer nconf MUST be first
// initializers.winston();
// initializers.database(nconf);
initializers.server(app);

const server = app.listen(nconf.get('server:port'), () => {
  winston.info(`environment ${nconf.get('environment')}`);
  winston.info(`Server listening on ${server.address().port}`);
  process.send('ready');
});
