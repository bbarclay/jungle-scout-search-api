import _ from 'lodash';
import { readdirSync } from 'fs';
import { join } from 'path';


const toExport = readdirSync(__dirname)
  .filter(name => name.endsWith('.js'))
  .filter(name => name !== 'index.js')
  // eslint-disable-next-line global-require, import/no-dynamic-require
  .map(file => [file.replace('.js', ''), require(join(__dirname, file)).default]);

export default _.fromPairs(_.compact(toExport));
