const mysql = require('promise-mysql');
const config = require('../const/config.js');
const keys = require('../const/keys.js').get();
const fetch = require('node-fetch');
let dbUser,dbPassword,dbName,dbHost,conn,fetchAuth;

module.exports.query = (sql) => {
  return new Promise(async function (resolve, reject) {
    try {
      if (!conn)
        await module.exports.getConnection();

      const res = await conn.query(sql);

      resolve(res);
    } catch (e) { reject(e); }
  });
};

module.exports.getConnection = () => {
  return new Promise(async function (resolve, reject) {
    try {
      if (!conn) {
        conn = await mysql.createConnection({
          host                : keys.managerHost,
          user                : keys.dbUser,
          password            : keys.dbPassword,
          database            : keys.dbName,
          dateStrings         : 'date',
          charset             : 'utf8mb4',
          supportBigNumbers   : true,
          bigNumberStrings    : true
        });

        console.log('Connected to manager ' + dbHost);
      }

      resolve(conn);
    } catch (e) { reject(e); }
  });
};


exports.fetch = (body,route,method) => {
  return new Promise(async function (resolve, reject) {
    try {
      let res;

      const requestObject = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'authorization': keys.managerApiAuth
        },
        //timeout: 12000,
      };

      if (body != null)
        requestObject.body = JSON.stringify(body);

      res = await fetch('http://' + keys.managerHost + route, requestObject);
      //console.log(res);
      res = await res.json();
      if (res.error != null)
        return reject('Remote DB Error: ' + res.error);

      if(res.results)
        resolve(res.results);
      else
        resolve(res);
    } catch (e) { reject('Fetch Error in backup.api.call(): ' + e); }
  });
}
