import { updateAdminUser } from '../actions';
import { postAdminLogin } from '../api';

const dispatchLoginAdminUser = (aid, password) => {
  return async (dispatch) => {
    const userData = await postAdminLogin(aid, password);
    dispatch(updateAdminUser(userData));
  };
};

// eslint-disable-next-line import/prefer-default-export
export { dispatchLoginAdminUser };
