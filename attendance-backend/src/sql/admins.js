const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');
const { createPermissionError, createValidationError } = require('../helpers/errors');

const SELECT_ADMIN_BY_AID = (aid) => `SELECT * FROM ADMIN WHERE aid='${aid}'`;

module.exports.getAdminDetails = async (aid) => {
  if (!/^\S{6,}$/.test(aid)) {
    throw createValidationError('admin_id_invalid', 'Invalid admin ID');
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
