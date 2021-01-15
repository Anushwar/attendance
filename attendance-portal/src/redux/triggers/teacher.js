import {
  loadTeacherCourses,
  loadTeacherCoursesToday,
  updateTeacherUser,
  loadTeacherCourseDetails,
  loadTeacherAttendances,
} from '../actions';
import {
  getTeacherCourses,
  getTeacherCoursesToday,
  postTeacherLogin,
  getTeacherCourseDetails,
  getTeacherAttendances,
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

export {
  dispatchLoginTeacherUser,
  dispatchLoadCoursesTeacher,
  dispatchLoadCoursesTeacherToday,
  dispatchLoadCourseOfTeacher,
  dispatchLoadAttendancesOfTeacher,
};
