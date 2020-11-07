const { request } = require('express');
const connection = require('../db/db');

module.exports = (query) => new Promise((resolve, reject) => {
  connection.query(query, (err, results, fields) => {
    if (err) {
      reject(err);
    }
    resolve({ data: results, fields });
  });
});
