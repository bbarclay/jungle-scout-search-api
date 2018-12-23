/* eslint-disable no-global-assign */
require('./initializers').pm2();

require = require('esm')(module);
module.exports = require('./app.js');
