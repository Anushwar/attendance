const result = require('../helpers/result');

const CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS USER(
    uid INT,
    name VARCHAR(20) NOT NULL,
    role ENUM ('admin', 'staff','teacher', 'student') NOT NULL,
    password VARCHAR(50) NOT NULL, 
    PRIMARY KEY (uid)
);`;

module.exports = async () => {
  try {
    await result(CREATE_USER_TABLE);
  } catch (err) {
    console.log(err);
  }
};
