import { HttpStatusError } from 'common-errors';
import $ from 'cheerio';
import rp from 'request-promise';

import middlewares from '../../middlewares';
import Product from '../../models/Product';

const parser = async (asin) => {
  const url = `https://www.amazon.com/dp/${asin}`;
  const html = await rp({ url, gzip: true });

  const category = await $('.a-breadcrumb > ul > li:first-child > .a-list-item > a', html).text().trim();
  const rank = await $('tr#SalesRank > td.value', html).contents().first().text()
    .trim()
    .replace(/[^\w\s#]/gi, '');
  const dimensions = await $('td:contains(Product Dimensions)', html).next().text().trim();

  return {
    asin,
    category,
    dimensions,
    rank,
  };
};

const getProduct = async asin => Product.findOne({ asin });

const cacheProduct = record => Product.create(record);

const isInCache = async (asin) => {
  const searchRecord = await getProduct(asin);

  if (!searchRecord) {
    return false;
  }

  const today = new Date().getDate();
  const shouldUpdate = searchRecord.get('updatedAt').getDate() > today;

  if (shouldUpdate) {
    return false;
  }

  return true;
};

const search = async (req, res) => {
  const { asin } = req.query;
  let result = {};

  if (!asin) {
    throw new HttpStatusError(400, 'ASIN is missing');
  }

  if (!await isInCache(asin)) {
    result = await cacheProduct(await parser(asin));
  } else {
    result = await getProduct(asin);
  }

  res.json(result);
};

export const autoroute = {
  getAsync: {
    '/search': [middlewares.authentication, search],
  },
};
