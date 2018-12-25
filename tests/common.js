global.rootPath = fileName => `${__dirname}/../${fileName}`;

// eslint-disable-next-line global-require,import/no-dynamic-require
global.rootRequire = fileName => require(global.rootPath(fileName));
