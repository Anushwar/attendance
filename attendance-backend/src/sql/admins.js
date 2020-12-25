const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createPermissionError, createValidationError } = require('../helpers/errors');

// queries
const SELECT_ADMIN_BY_AID = (aid) => `SELECT * FROM ADMIN WHERE aid='${aid}'`;

// executors
module.exports.getAdminDetails = async (aid) => {
  if (!/^\S{5,}$/.test(aid)) {
    throw createValidationError('admin_id_invalid', 'Invalid admin ID, id cannot be smaller than 5 characters');
  }
  const { data } = await makeQuery(
    SELECT_ADMIN_BY_AID(aid),
    databasePermissions.ADMIN,
  );
  if (data.length <= 0) {
    throw createPermissionError('admin_id_invalid', 'Admin not found');
  }
  return data[0];
};
