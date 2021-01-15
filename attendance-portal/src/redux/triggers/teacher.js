import {
  loadTeacherCourses,
  loadTeacherCoursesToday,
  updateTeacherUser,
  loadTeacherCourseDetails,
} from '../actions';
import {
  getTeacherCourses,
  getTeacherCoursesToday,
  postTeacherLogin,
  getTeacherCourseDetails,
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

export {
  dispatchLoginTeacherUser,
  dispatchLoadCoursesTeacher,
  dispatchLoadCoursesTeacherToday,
  dispatchLoadCourseOfTeacher,
};
