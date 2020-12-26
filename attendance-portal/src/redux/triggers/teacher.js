import { loadTeacherCourses, updateTeacherUser } from '../actions';
import { getTeacherCourses, postTeacherLogin } from '../api';

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

export { dispatchLoginTeacherUser, dispatchLoadCoursesTeacher };
