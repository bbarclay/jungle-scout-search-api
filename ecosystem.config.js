module.exports = {
  apps: [{
    name: 'api',
    script: 'app.js',
    node_args: '-r esm',
    ignore_watch: ['.git', 'node_modules', 'data'],
    env: {
      NODE_ENV: 'development',
      watch: true,
    },
    env_production: {
      NODE_ENV: 'production',
      instances: 'max',
    },
  }],
};
