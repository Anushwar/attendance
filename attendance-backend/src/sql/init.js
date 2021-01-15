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

const GRANT_STUDENT_COURSE_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.COURSE TO '${SQL_STUDENT_USER}'@'${SQL_HOST}';`;

// class section
const CREATE_CLASS_TABLE = `CREATE TABLE IF NOT EXISTS CLASS(
  classID VARCHAR(20),
  semester SMALLINT,
  section VARCHAR(2),
  tid VARCHAR(20),
  PRIMARY KEY (classID),
  FOREIGN KEY (tid) REFERENCES TEACHER(tid) ON DELETE SET NULL
);`;

const GRANT_TEACHER_CLASS_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.CLASS TO '${SQL_TEACHER_USER}'@'${SQL_HOST}';`;

const GRANT_STUDENT_CLASS_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.CLASS TO '${SQL_STUDENT_USER}'@'${SQL_HOST}';`;

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
    password VARCHAR(50) NOT NULL,
    classID VARCHAR(20),
    PRIMARY KEY (uid),
    FOREIGN KEY (classID) REFERENCES CLASS(classID) ON DELETE SET NULL
);`;

const GRANT_STUDENT_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.STUDENT TO '${SQL_STUDENT_USER}'@'${SQL_HOST}';`;

// student enlistment section
const CREATE_STUDENT_ENLISTMENT_TABLE = `CREATE TABLE IF NOT EXISTS STUD_ENLISTMENT(
  uid VARCHAR(20),
  courseID VARCHAR(20),
  PRIMARY KEY (uid, courseID),
  FOREIGN KEY (uid) REFERENCES STUDENT(uid) ON DELETE CASCADE,
  FOREIGN KEY (courseID) REFERENCES COURSE(courseID) ON DELETE CASCADE
);`;

const GRANT_STUDENT_ENLISTMENT_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.STUD_ENLISTMENT TO '${SQL_STUDENT_USER}'@'${SQL_HOST}';`;

// slot section
const CREATE_SLOT_TABLE = `CREATE TABLE IF NOT EXISTS SLOT(
  slotID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),
  startTime TIME,
  endTime TIME,
  CONSTRAINT end_time_after_start_time CHECK ( endTime > startTime ),
  PRIMARY KEY (slotID)
  );`;

const GRANT_TEACHER_SLOT_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.SLOT TO '${SQL_TEACHER_USER}'@'${SQL_HOST}'`;

// timetable section
const CREATE_TIMETABLE_TABLE = `CREATE TABLE IF NOT EXISTS TIMETABLE(
  classID VARCHAR(20),
  day TINYINT CHECK (DAY BETWEEN 1 AND 7),
  slotID INT,
  courseID VARCHAR(20) NOT NULL,
  PRIMARY KEY (classID, day, slotID),
  FOREIGN KEY (classID) REFERENCES CLASS(classID) ON DELETE CASCADE,
  FOREIGN KEY (slotID) REFERENCES SLOT(slotID) ON DELETE CASCADE,
  FOREIGN KEY (courseID) REFERENCES COURSE(courseID) ON DELETE CASCADE
);`;

const GRANT_TEACHER_TIMETABLE_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.TIMETABLE TO '${SQL_TEACHER_USER}'@'${SQL_HOST}'`;

// attendance section
const CREATE_ATTENDANCE_TABLE = `CREATE TABLE IF NOT EXISTS ATTENDANCE(
  attendanceID VARCHAR(20),
  classID VARCHAR(20),
  courseID VARCHAR(20),
  date DATE,
  PRIMARY KEY (attendanceID),
  FOREIGN KEY (classID) REFERENCES CLASS(classID) ON DELETE SET NULL,
  FOREIGN KEY (courseID) REFERENCES COURSE(courseID) ON DELETE SET NULL
)`;

const GRANT_TEACHER_ATTENDANCE_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.ATTENDANCE TO '${SQL_TEACHER_USER}'@'${SQL_HOST}'`;

// student attendance section
const CREATE_STUD_ATTENDANCE_TABLE = `CREATE TABLE IF NOT EXISTS STUD_ATTENDANCE(
  attendanceID VARCHAR(20),
  uid VARCHAR(20),
  isPresent BOOL,
  PRIMARY KEY(attendanceID, uid),
  FOREIGN KEY (attendanceID) REFERENCES ATTENDANCE(attendanceID) ON DELETE CASCADE,
  FOREIGN KEY (uid) REFERENCES STUDENT(uid) ON DELETE CASCADE

)`;

const GRANT_TEACHER_STUD_ATTENDANCE_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.STUD_ATTENDANCE TO '${SQL_TEACHER_USER}'@'${SQL_HOST}'`;

// enrollment details view

const CREATE_ENROLLMENT_DETAIL_VIEW = `CREATE OR REPLACE VIEW ENROLLMENT_DETAIL AS 
SELECT C.classID, C.semester, C.section, CO.courseID, CO.courseName,CO.courseDescription, T.tid, T.name FROM ENROLLMENT  E
JOIN CLASS C
ON E.classID = C.classID
JOIN COURSE CO
ON E.courseID = CO.courseID
JOIN TEACHER T
on E.tid = T.tid;`;

const GRANT_TEACHER_ENROLLMENT_DETAIL_PRIV = `GRANT SELECT ON ${SQL_DATABASE}.ENROLLMENT_DETAIL TO '${SQL_TEACHER_USER}'@'${SQL_HOST}'`;

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
    await makeQuery(GRANT_STUDENT_COURSE_PRIV, databasePermissions.ROOT);
    // class section
    await makeQuery(CREATE_CLASS_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_CLASS_PRIV, databasePermissions.ROOT);
    await makeQuery(GRANT_STUDENT_CLASS_PRIV, databasePermissions.ROOT);

    // enrollment section
    await makeQuery(CREATE_ENROLLMENT_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_ENROLLMENT_PRIV, databasePermissions.ROOT);
    // student section
    await makeQuery(CREATE_STUDENT_USER, databasePermissions.ROOT);
    await makeQuery(CREATE_STUDENT_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_STUDENT_PRIV, databasePermissions.ROOT);
    // slot table
    await makeQuery(CREATE_SLOT_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_SLOT_PRIV, databasePermissions.ROOT);
    // timetable table
    await makeQuery(CREATE_TIMETABLE_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_TIMETABLE_PRIV, databasePermissions.ROOT);
    // student enlistment section
    await makeQuery(CREATE_STUDENT_ENLISTMENT_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_STUDENT_ENLISTMENT_PRIV, databasePermissions.ROOT);
    // attendance section
    await makeQuery(CREATE_ATTENDANCE_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_ATTENDANCE_PRIV, databasePermissions.ROOT);
    // student attendance section
    await makeQuery(CREATE_STUD_ATTENDANCE_TABLE, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_STUD_ATTENDANCE_PRIV, databasePermissions.ROOT);
    // Enrollment details section
    await makeQuery(CREATE_ENROLLMENT_DETAIL_VIEW, databasePermissions.ROOT);
    await makeQuery(GRANT_TEACHER_ENROLLMENT_DETAIL_PRIV, databasePermissions.ROOT);
  } catch (err) {
    console.error(err);
  }
};
