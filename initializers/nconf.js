import nconf from 'nconf';

export default () => {
  // error if environment is not set correctly
  if (!['production', 'development', 'test'].includes(process.env.NODE_ENV)) {
    throw new Error('NODE_ENV must be production, development or test');
  }

  nconf.file('localOverrides', {
    file: `${process.env.NODE_ENV}.json`,
    dir: 'config',
    search: true,
  });

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
        subdomain: '',
        tags: [process.env.NODE_ENV],
        json: true,
        level: 'info',
      },
    },
    database: {
      mongoUrl: process.env.MONGO_URL,
    },
  });
};
