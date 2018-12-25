import autoroute from 'express-autoroute';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import nofavicon from 'express-no-favicons';
import path from 'path';

import log, { expressLogger } from './logger';
import middlewares from '../middlewares';

export default (app) => {
  app.use(expressLogger);

  app.use(nofavicon());

  app.use(helmet());

  app.use(cors());

  app.use(compression());

  app.use(bodyParser.json({ type: 'application/json' }));

  app.use(middlewares.rateLimiter());

  // Loading all routes
  autoroute(app, {
    routesDir: path.join(__dirname, '../routes'),
    logger: log,
  });

  app.use(middlewares.errorHandler);
};
