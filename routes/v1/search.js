import { HttpStatusError } from 'common-errors';
import $ from 'cheerio';
import rp from 'request-promise';
import fs from 'fs';

import middlewares from '../../middlewares';
import Search from '../../models/Search';

const parser = async (asin) => {
  const url = `https://www.amazon.com/dp/${asin}`;
  const html = await rp({ url, gzip: true });
  await fs.writeFileSync('html-blh.html', html);
  const category = await $('.a-breadcrumb > ul > li:first-child > .a-list-item > a', html).text().trim();
  // const rank = await $('', html);
  const dimensions = await $('td:contains(Product Dimensions)', html).next().text();

  return {
    asin,
    category,
    dimensions,
  };
};

const getSearchItem = async asin => Search.findOne({ asin });

const cacheSearch = record => Search.create(record);

const isInCache = async (asin) => {
  const searchRecord = await getSearchItem(asin);

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
    result = await cacheSearch(await parser(asin));
  } else {
    result = await getSearchItem(asin);
  }

  res.json(result);
};

export const autoroute = {
  getAsync: {
    '/search': [middlewares.authentication, search],
  },
};
