const result = require('../helpers/result');

const {
  SQL_HOST,
  // admin login
  SQL_ADMIN_USER,
  SQL_ADMIN_PASSWORD,
  // teacher login
  SQL_TEACHER_USER,
  SQL_TEACHER_PASSWORD,
} = process.env;

const CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS USER(
    uid INT,
    name VARCHAR(20) NOT NULL,
    role ENUM ('admin', 'staff','teacher', 'student') NOT NULL,
    password VARCHAR(50) NOT NULL, 
    PRIMARY KEY (uid)
);`;

// admin section
const CREATE_ADMIN_USER = `CREATE USER IF NOT EXISTS 
'${SQL_ADMIN_USER}'@'${SQL_HOST}' IDENTIFIED WITH mysql_native_password BY '${SQL_ADMIN_PASSWORD}';`;

const CREATE_ADMIN_TABLE = `CREATE TABLE IF NOT EXISTS ADMIN(
    aid VARCHAR(20),
    name VARCHAR(20),
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (aid)
);`;

// teacher section
const CREATE_TEACHER_USER = `CREATE USER IF NOT EXISTS 
'${SQL_TEACHER_USER}'@'${SQL_HOST}' IDENTIFIED WITH mysql_native_password BY '${SQL_TEACHER_PASSWORD}';`;

const CREATE_TEACHER_TABLE = `CREATE TABLE IF NOT EXISTS TEACHER(
    tid VARCHAR(20),
    name VARCHAR(20),
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (tid)
);`;

module.exports = async () => {
  try {
    await result(CREATE_USER_TABLE);
    // admin section
    await result(CREATE_ADMIN_USER);
    await result(CREATE_ADMIN_TABLE);
    // teacher section
    await result(CREATE_TEACHER_USER);
    await result(CREATE_TEACHER_TABLE);
  } catch (err) {
    console.log(err);
  }
};
