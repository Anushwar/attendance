const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createValidationError } = require('../helpers/errors');

// queries
const INSERT_CLASS = (classID, semester, section, tid) => `INSERT INTO CLASS VALUES (
    '${classID}',
    ${semester},
    '${section}',
    '${tid}'
  );`;

const SELECT_ALL_CLASSES = () => 'SELECT * FROM CLASS;';

// executors
module.exports.createClass = async (classID, semester, section, tid) => {
  await makeQuery(INSERT_CLASS(classID, semester, section, tid), databasePermissions.ADMIN);
  return {
    classID, semester, section, tid,
  };
};

module.exports.getAllClasses = async () => {
  const { data: classes } = await makeQuery(SELECT_ALL_CLASSES(), databasePermissions.ADMIN);
  return classes;
};
