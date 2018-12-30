import { HttpStatusError } from 'common-errors';
import _ from 'lodash';

import middlewares from '../../middlewares';
import Product from '../../models/Product';

const getAll = async (req, res) => {
  const records = await Product.find({});

  if (_.isEmpty(records)) {
    throw new HttpStatusError(404, 'No products have been found');
  }

  res.json(records);
};

export const autoroute = {
  getAsync: {
    '/products': [middlewares.authentication, getAll],
  },
};
