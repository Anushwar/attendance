const connection = require('mysql');

const { SQL_USER: user, SQL_PASSWORD: password, SQL_DATABASE: database } = process.env;

const lhc = connection.createConnection({
  host: 'localhost',
  user,
  password,
  database,
});

lhc.connect();

lhc.query('SELECT * FROM USER WHERE UID = 200', (error, results, fields) => {
  console.log(results);
});
