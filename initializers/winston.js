import nconf from 'nconf';
import winston from 'winston';
import winstonLogglyBulk from 'winston-loggly-bulk'; // eslint-disable-line no-unused-vars
import expressWinston from 'express-winston';

export default () => {
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, Object.assign(nconf.get('logger:winstonConsole'), {
    colorize: true,
    timestamp: true,
    handleExceptions: true,
    prettyPrint: true,
  }));

  if (process.env.NODE_ENV === 'production' && nconf.get('logger:winstonLoggly:token')) {
    winston.add(winston.transports.Loggly, nconf.get('logger:winstonLoggly'));
  }
};


export const expressWinstonLogger = expressWinston.logger({
  winstonInstance: winston,
  expressFormat: true,
  ignoreRoute(req) { return req.path === '/'; },
  level(req, res) {
    let level = '';
    if (res.statusCode >= 100) { level = 'info'; }
    if (res.statusCode >= 400) { level = 'warn'; }
    if (res.statusCode >= 500) { level = 'error'; }

    // TODO: consider removing once we have a better way to prevent DoS attacks
    if (res.statusCode === 404) { level = 'debug'; }

    return level;
  },
});
