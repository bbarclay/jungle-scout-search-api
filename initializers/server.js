import autoroute from 'express-autoroute';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import nofavicon from 'express-no-favicons';
import path from 'path';
import winston from 'winston';

import { expressWinstonLogger } from './winston';
import middlewares from '../middlewares';


export default (app) => {
  app.use(expressWinstonLogger);

  app.use(nofavicon());

  app.use(helmet());

  app.use(cors());

  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.use(compression());

  // Loading all routes
  autoroute(app, {
    routesDir: path.join(__dirname, '../routes'),
    logger: winston,
  });

  app.use(middlewares.errorHandler);
};
