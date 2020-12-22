import { addStudentDetails } from '../actions';
import { getStudentDetails } from '../api';

const dispatchAddStudentDetails = () => {
  return async (dispatch) => {
    const { data } = await getStudentDetails();
    dispatch(addStudentDetails(data));
  };
};

// eslint-disable-next-line import/prefer-default-export
export { dispatchAddStudentDetails };
