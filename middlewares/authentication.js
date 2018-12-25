import { HttpStatusError } from 'common-errors';
import { wrap } from '@awaitjs/express';
import _ from 'lodash';

import Application from '../models/Application';

export default wrap(async (req, res, next) => {
  const apiKey = req.get('X-API-KEY');
  const application = await Application.find({ apiKey });

  if (_.isEmpty(application)) {
    throw new HttpStatusError(401, 'Unauthorized');
  }

  next();
});
