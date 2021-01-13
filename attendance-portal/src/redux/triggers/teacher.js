import {
  loadTeacherCourses,
  loadTeacherCoursesToday,
  updateTeacherUser,
} from '../actions';
import {
  getTeacherCourses,
  getTeacherCoursesToday,
  postTeacherLogin,
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

export {
  dispatchLoginTeacherUser,
  dispatchLoadCoursesTeacher,
  dispatchLoadCoursesTeacherToday,
};
