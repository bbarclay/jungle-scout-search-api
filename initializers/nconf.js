import nconf from 'nconf';
import path from 'path';

export default () => {
  // error if environment is not set correctly
  if (!['production', 'development', 'test'].includes(process.env.NODE_ENV)) {
    throw new Error('NODE_ENV must be production, staging or development');
  }

  nconf.file('localOverrides', path.join(__dirname, '../config', `${process.env.NODE_ENV}.json`));

  if (nconf.get('nconf:file')) {
    nconf.file('local-file', nconf.get('nconf:file'));
  }

  // common options
  nconf.defaults({
    environment: process.env.NODE_ENV,
    server: {
      port: 3000,
    },
    logger: {
      winstonConsole: {
        level: process.env.LOG_LEVEL || 'info',
      },
      winstonLoggly: {
        token: process.env.LOGGLY_TOKEN,
        subdomain: 'selected',
        tags: [process.env.NODE_ENV],
        json: true,
        level: 'info',
      },
    },
    database: {
      mongo: process.env.MONGO,
    },
  });
};
