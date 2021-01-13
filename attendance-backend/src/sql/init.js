const makeQuery = require('../helpers/result');
const { databasePermissions } = require('../helpers/constants');

const {
  SQL_HOST,
  SQL_DATABASE,
  // admin login
  SQL_ADMIN_USER,
  SQL_ADMIN_PASSWORD,
  // teacher login
  SQL_TEACHER_USER,
  SQL_TEACHER_PASSWORD,
  // student login
  SQL_STUDENT_USER,
  SQL_STUDENT_PASSWORD,
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

const GRANT_ADMIN_PRIV = `GRANT ALL ON ${SQL_DATABASE}.* TO '${SQL_ADMIN_USER}'@'${SQL_HOST}'`;

// teacher section
const CREATE_TEACHER_USER = `CREATE USER IF NOT EXISTS 
  '${SQL_TEACHER_USER}'@'${SQL_HOST}' IDENTIFIED WITH mysql_native_password BY '${SQL_TEACHER_PASSWORD}';`;

const CREATE_TEACHER_TABLE = `CREATE TABLE IF NOT EXISTS TEACHER(
  tid VARCHAR(20),
  name VARCHAR(50),
  password VARCHAR(50) NOT NULL,
  PRIMARY KEY (tid)
);`;

const GRANT_TEACHER_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.TEACHER TO '${SQL_TEACHER_USER}'@'${SQL_HOST}'`;

// courses section
const CREATE_COURSE_TABLE = `CREATE TABLE IF NOT EXISTS COURSE(
  courseID VARCHAR(20),
  courseName VARCHAR(200),
  courseHoursLecture SMALLINT,
  courseHoursTutorial SMALLINT,
  courseHoursPractical SMALLINT,
  courseCredits SMALLINT,
  courseDescription VARCHAR(400),
  PRIMARY KEY (courseID)
);`;

const GRANT_TEACHER_COURSE_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.COURSE TO '${SQL_TEACHER_USER}'@'${SQL_HOST}';`;

// class section
const CREATE_CLASS_TABLE = `CREATE TABLE IF NOT EXISTS CLASS(
  classID VARCHAR(20),
  semester SMALLINT,
  section VARCHAR(2),
  tid VARCHAR(20),
  PRIMARY KEY (classID),
  FOREIGN KEY (tid) REFERENCES TEACHER(tid) ON DELETE SET NULL
);`;

const GRANT_CLASS_ENROLLMENT_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.CLASS TO '${SQL_TEACHER_USER}'@'${SQL_HOST}';`;

// enrollment section section
const CREATE_ENROLLMENT_TABLE = `CREATE TABLE IF NOT EXISTS ENROLLMENT(
  classID VARCHAR(20),
  courseID VARCHAR(20),
  tid VARCHAR(20),
  PRIMARY KEY (classID, courseID),
  FOREIGN KEY (classID) REFERENCES CLASS(classID) ON DELETE CASCADE,
  FOREIGN KEY (courseID) REFERENCES COURSE(courseID) ON DELETE CASCADE,
  FOREIGN KEY (tid) REFERENCES  TEACHER(tid) ON DELETE SET NULL
);`;

const GRANT_TEACHER_ENROLLMENT_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.ENROLLMENT TO '${SQL_TEACHER_USER}'@'${SQL_HOST}';`;

// student section
const CREATE_STUDENT_USER = `CREATE USER IF NOT EXISTS
  '${SQL_STUDENT_USER}'@'${SQL_HOST}' IDENTIFIED WITH mysql_native_password BY '${SQL_STUDENT_PASSWORD}';`;

const CREATE_STUDENT_TABLE = `CREATE TABLE IF NOT EXISTS STUDENT(
    uid VARCHAR(20),
    name VARCHAR(50),
    classID VARCHAR(20),
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (uid)
);`;

const GRANT_STUDENT_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.STUDENT TO '${SQL_STUDENT_USER}'@'${SQL_HOST}';`;

// student enlistment section
const CREATE_STUDENT_ENLISTMENT_TABLE = `CREATE TABLE IF NOT EXISTS STUD_ENLISTMENT(
  classID VARCHAR(20),
  courseID VARCHAR(20),
  uid VARCHAR(20),
  PRIMARY KEY (classID, courseID, uid),
  FOREIGN KEY (uid) REFERENCES STUDENT(uid) ON DELETE CASCADE,
  FOREIGN KEY (classID) REFERENCES CLASS(classID) ON DELETE CASCADE,
  FOREIGN KEY (courseID) REFERENCES COURSE(courseID) ON DELETE CASCADE
);`;

const GRANT_STUDENT_ENLISTMENT_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.STUD_ENLISTMENT TO '${SQL_STUDENT_USER}'@'${SQL_HOST}';`;

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
    // course section
    await makeQuery(CREATE_COURSE_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_COURSE_PRIV, databasePermissions.ROOT);
    // class section
    await makeQuery(CREATE_CLASS_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_CLASS_ENROLLMENT_PRIV, databasePermissions.ROOT);
    // enrollment section
    await makeQuery(CREATE_ENROLLMENT_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_ENROLLMENT_PRIV, databasePermissions.ROOT);
    // student section
    await makeQuery(CREATE_STUDENT_USER, databasePermissions.ROOT);
    await makeQuery(CREATE_STUDENT_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_STUDENT_PRIV, databasePermissions.ROOT);
    // student enlistment section
    await makeQuery(CREATE_STUDENT_ENLISTMENT_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_STUDENT_ENLISTMENT_PRIV, databasePermissions.ROOT);
  } catch (err) {
    console.log(err);
  }
};
