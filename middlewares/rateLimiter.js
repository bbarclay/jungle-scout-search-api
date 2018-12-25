import RateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';
import nconf from 'nconf';

export default () => new RateLimit({
  store: new MongoStore({
    uri: nconf.get('database:mongoUrl'),
  }),
  max: 100,
  windowMs: 15 * 60 * 1000,
});
