const result = require('../helpers/result');

const INSERT_USER = (uid, name, role, password) => `INSERT INTO USER VALUES(
    '${uid}',
    '${name}',
    '${role}',
    '${password}'
);`;

const SELECT_USER_BY_UID = (uid) => `SELECT * FROM USER WHERE UID=${uid}`;

module.exports.createNewUser = (
  uid, name, role, password,
) => result(INSERT_USER(uid, name, role, password));

module.exports.getUserDetails = async (uid) => {
  const { data } = await result(SELECT_USER_BY_UID(uid));
  return data[0];
};
