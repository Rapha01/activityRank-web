const managerDb = require('./managerDb.js');
const requireFromString = require('require-from-string');

exports.updateTexts = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const textsObj = await managerDb.fetch(null,'/api/texts','get');
      for (key in textsObj)
        exports[key] = textsObj[key];

      resolve();
    } catch (e) { return reject(e); }
  });
}

/*
exports.botStats = {};
exports.shardStats = {};

exports.updateBotStats = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const stats = await backupApi.call({},'/api/getBotStats','post');
      if (stats)
        exports.botStats = stats;

      resolve();
    } catch (e) { return reject(e); }
  });
}

exports.updateShardStats = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const stats = await backupApi.call({tablename: 'gl_shard',conditions: {},from: 0,to: 5000},'/api/getMulti','post');
      if (stats)
        exports.shardStats = stats;

      resolve();
    } catch (e) { return reject(e); }
  });
}
*/
