import { addStudentDetails, updateStudentUser } from '../actions';
import { getStudentDetails, postStudentLogin } from '../api';

const dispatchAddStudentDetails = () => {
  return async (dispatch) => {
    const { data } = await getStudentDetails();
    dispatch(addStudentDetails(data));
  };
};

const dispatchLoginStudentUser = (uid, password) => {
  return async (dispatch) => {
    const { data } = await postStudentLogin(uid, password);
    dispatch(updateStudentUser({ ...data, password }));
  };
};

export { dispatchAddStudentDetails, dispatchLoginStudentUser };
