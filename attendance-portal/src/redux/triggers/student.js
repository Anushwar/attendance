import {
  loadStudentCourseAttendance,
  loadStudentCourseDetails,
  loadStudentCourses,
  updateStudentUser,
} from '../actions';
import {
  getStudentCourseDetails,
  getStudentCourses,
  postStudentLogin,
  getStudentAttendanceOfCourse,
} from '../api';

const dispatchLoginStudentUser = (uid, password) => {
  return async (dispatch) => {
    const { data } = await postStudentLogin(uid, password);
    dispatch(updateStudentUser({ ...data, password }));
  };
};

const dispatchLoadCoursesStudent = () => {
  return async (dispatch) => {
    const { data: courses } = await getStudentCourses();
    dispatch(loadStudentCourses(courses));
  };
};

const dispatchLoadCourseOfStudent = (courseID) => {
  return async (dispatch) => {
    const { data: course } = await getStudentCourseDetails(courseID);
    dispatch(loadStudentCourseDetails(course));
  };
};

const dispatchLoadCourseAttendanceOfStudent = (courseID) => {
  return async (dispatch) => {
    const { data: attendances } = await getStudentAttendanceOfCourse(courseID);
    dispatch(loadStudentCourseAttendance(attendances));
  };
};

export {
  dispatchLoginStudentUser,
  dispatchLoadCoursesStudent,
  dispatchLoadCourseOfStudent,
  dispatchLoadCourseAttendanceOfStudent,
};
