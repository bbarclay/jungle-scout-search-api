import nconf from 'nconf';
import { createLogger, format, transports } from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import expressWinston from 'express-winston';

const {
  combine, timestamp, printf, colorize, prettyPrint,
} = format;

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    colorize({ all: true }),
    printf(info => `${info.timestamp}: [${info.level}] ${info.message}`)
  ),
  transports: [new transports.Console()],
});

if (process.env.NODE_ENV === 'production' && nconf.get('logger:winstonLoggly:token')) {
  logger.add(new Loggly({
    options: nconf.get('logger:winstonLoggly'),
  }));
}

export default logger;

export const expressLogger = expressWinston.logger({
  transports: [
    new transports.Console(),
  ],
  format: combine(
    prettyPrint()
  ),
  expressFormat: true,
  ignoreRoute(req) { return req.path === '/'; },
  level(req, res) {
    let level = '';

    if (res.statusCode >= 100) { level = 'info'; }
    if (res.statusCode >= 400) { level = 'warn'; }
    if (res.statusCode >= 500) { level = 'error'; }

    return level;
  },
});

if (process.env.NODE_ENV === 'production' && nconf.get('logger:winstonLoggly:token')) {
  expressLogger.add(new Loggly(nconf.get('logger:winstonLoggly')));
}
