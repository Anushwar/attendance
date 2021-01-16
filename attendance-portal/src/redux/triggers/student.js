import {
  loadStudentCourseDetails,
  loadStudentCourses,
  updateStudentUser,
} from '../actions';
import {
  getStudentCourseDetails,
  getStudentCourses,
  postStudentLogin,
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

const dispatchLoadCourseOfStudent = () => {
  return async (dispatch) => {
    const { data: course } = await getStudentCourseDetails();
    dispatch(loadStudentCourseDetails(course));
  };
};

// eslint-disable-next-line import/prefer-default-export
export {
  dispatchLoginStudentUser,
  dispatchLoadCoursesStudent,
  dispatchLoadCourseOfStudent,
};
