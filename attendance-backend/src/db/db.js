const connection = require('mysql');

const { SQL_USER: user, SQL_PASSWORD: password, SQL_DATABASE: database } = process.env;

const localHostConnection = connection.createConnection({
  host: 'localhost',
  user,
  password,
  database,
});

localHostConnection.connect();

module.exports = localHostConnection;
