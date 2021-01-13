const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

// queries
const INSERT_TIME_TABLE = (classID, day, slotID, courseID) => `INSERT INTO TIMETABLE VALUES (
    '${classID}',
    ${day},
    ${slotID},
    '${courseID}'
  );`;

const GET_TIMETABLE_FROM_CLASS = (classID) => `SELECT * FROM TIMETABLE WHERE classID='${classID}';`;

// executors
module.exports.createTimtableEntry = async (classID, day, slotID, courseID) => {
  await makeQuery(INSERT_TIME_TABLE(classID, day, slotID, courseID), databasePermissions.ADMIN);

  return {
    classID,
    day,
    slotID,
    courseID,
  };
};

module.exports.getTimeTableFromClass = async (classID) => {
  const { data: timeTable } = await makeQuery(
    GET_TIMETABLE_FROM_CLASS(classID),
    databasePermissions.ADMIN,
  );
  return timeTable;
};
