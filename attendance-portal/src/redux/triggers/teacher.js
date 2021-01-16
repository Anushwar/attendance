import {
  loadTeacherCourses,
  loadTeacherCoursesToday,
  updateTeacherUser,
  loadTeacherCourseDetails,
  loadTeacherAttendances,
  loadTeacherStudents,
  loadTeacherAttendanceDetails,
  loadStudentAttendance,
} from '../actions';
import {
  getTeacherCourses,
  getTeacherCoursesToday,
  postTeacherLogin,
  getTeacherCourseDetails,
  getTeacherAttendances,
  getTeacherStudents,
  getTeacherAttendanceDetails,
  getTeacherStudentAttendance,
} from '../api';

const dispatchLoginTeacherUser = (tid, password) => {
  return async (dispatch) => {
    const { data } = await postTeacherLogin(tid, password);
    dispatch(updateTeacherUser({ ...data, password }));
  };
};

const dispatchLoadCoursesTeacher = () => {
  return async (dispatch) => {
    const { data: courses } = await getTeacherCourses();
    dispatch(loadTeacherCourses(courses));
  };
};

const dispatchLoadCoursesTeacherToday = () => {
  return async (dispatch) => {
    const { data: courses } = await getTeacherCoursesToday();
    dispatch(loadTeacherCoursesToday(courses));
  };
};

const dispatchLoadCourseOfTeacher = (classID, courseID) => {
  return async (dispatch) => {
    const { data: course } = await getTeacherCourseDetails(classID, courseID);
    dispatch(loadTeacherCourseDetails(course));
  };
};

const dispatchLoadAttendancesOfTeacher = (classID, courseID) => {
  return async (dispatch) => {
    const { data: attendances } = await getTeacherAttendances(
      classID,
      courseID
    );
    dispatch(loadTeacherAttendances(attendances));
  };
};

const dispatchLoadStudentsOfTeacher = (classID, courseID) => {
  return async (dispatch) => {
    const { data: students } = await getTeacherStudents(classID, courseID);
    dispatch(loadTeacherStudents(students));
  };
};

const dispatchLoadAttendanceDetails = (classID, courseID, attendanceID) => {
  return async (dispatch) => {
    const { data: attendance } = await getTeacherAttendanceDetails(
      classID,
      courseID,
      attendanceID
    );
    dispatch(loadTeacherAttendanceDetails(attendance));
  };
};

const dispatchLoadStudentAttendance = (attendanceID) => {
  return async (dispatch) => {
    const { data: student } = await getTeacherStudentAttendance(attendanceID);
    dispatch(loadStudentAttendance(student));
  };
};

export {
  dispatchLoginTeacherUser,
  dispatchLoadCoursesTeacher,
  dispatchLoadCoursesTeacherToday,
  dispatchLoadCourseOfTeacher,
  dispatchLoadAttendancesOfTeacher,
  dispatchLoadStudentsOfTeacher,
  dispatchLoadStudentAttendance,
  dispatchLoadAttendanceDetails,
};
