const connection = require('mysql');

const { SQL_USER: user, SQL_PASSWORD: password, SQL_DATABASE: database } = process.env;

const rc = connection.createPool({
  host: 'localhost',
  user,
  password,
  database,
});

rc.query('SELECT * FROM USER WHERE UID = 200', (error, results, fields) => {
  console.log(results);
});
