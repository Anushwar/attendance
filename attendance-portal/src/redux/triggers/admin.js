import { updateAdminUser } from '../actions';
import { postAdminLogin } from '../api';

const dispatchLoginAdminUser = (aid, password) => {
  return async (dispatch) => {
    const { data } = await postAdminLogin(aid, password);
    dispatch(updateAdminUser({ ...data, password }));
  };
};

// eslint-disable-next-line import/prefer-default-export
export { dispatchLoginAdminUser };
