import { updateStudentUser } from '../actions';
import { postStudentLogin } from '../api';

const dispatchLoginStudentUser = (uid, password) => {
  return async (dispatch) => {
    const { data } = await postStudentLogin(uid, password);
    dispatch(updateStudentUser({ ...data, password }));
  };
};

// eslint-disable-next-line import/prefer-default-export
export { dispatchLoginStudentUser };
