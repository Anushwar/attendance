import { updateTeacherUser } from '../actions';
import { postTeacherLogin } from '../api';

const dispatchLoginTeacherUser = (tid, password) => {
  return async (dispatch) => {
    const { data } = await postTeacherLogin(tid, password);
    dispatch(updateTeacherUser({ ...data, password }));
  };
};

// eslint-disable-next-line import/prefer-default-export
export { dispatchLoginTeacherUser };
