const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

const {
  SQL_HOST,
  // admin login
  SQL_ADMIN_USER,
  SQL_ADMIN_PASSWORD,
  // teacher login
  SQL_TEACHER_USER,
  SQL_TEACHER_PASSWORD,
} = process.env;

// admin section
const CREATE_ADMIN_USER = `CREATE USER IF NOT EXISTS 
'${SQL_ADMIN_USER}'@'${SQL_HOST}' IDENTIFIED WITH mysql_native_password BY '${SQL_ADMIN_PASSWORD}';`;

const CREATE_ADMIN_TABLE = `CREATE TABLE IF NOT EXISTS ADMIN(
    aid VARCHAR(20),
    name VARCHAR(50),
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (aid)
);`;

const GRANT_ADMIN_PRIV = `GRANT ALL ON university.* TO '${SQL_ADMIN_USER}'@'${SQL_HOST}'`;

// teacher section
const CREATE_TEACHER_USER = `CREATE USER IF NOT EXISTS 
  '${SQL_TEACHER_USER}'@'${SQL_HOST}' IDENTIFIED WITH mysql_native_password BY '${SQL_TEACHER_PASSWORD}';`;

const CREATE_TEACHER_TABLE = `CREATE TABLE IF NOT EXISTS TEACHER(
    tid VARCHAR(20),
    name VARCHAR(50),
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (tid)
);`;

const GRANT_TEACHER_PRIV = `GRANT SELECT ON university.TEACHER TO '${SQL_TEACHER_USER}'@'${SQL_HOST}'`;
module.exports = async () => {
  try {
    // admin section
    await makeQuery(CREATE_ADMIN_USER, databasePermissions.ROOT);
    await makeQuery(CREATE_ADMIN_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_ADMIN_PRIV, databasePermissions.ROOT);
    // teacher section
    await makeQuery(CREATE_TEACHER_USER, databasePermissions.ROOT);
    await makeQuery(CREATE_TEACHER_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_PRIV, databasePermissions.ROOT);
  } catch (err) {
    console.log(err);
  }
};
