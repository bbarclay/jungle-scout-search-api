module.exports = {
  apps: [{
    name: 'api',
    script: 'app.js',
    node_args: '-r esm',
    env: {
      NODE_ENV: 'development',
      watch: true,
      ignore_watch: './data/**/**/',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
