import { updateUser } from "../actions";
import { postAdminLogin, postAdminRegister } from "../api";

const dispatchRegisterUser = (uid, name, role, password) => {
  return async (dispatch) => {
    await postAdminRegister(uid, name, role, password);
    dispatch(updateUser({ uid, name, role, password }));
  };
};

const dispatchLoginUser = (uid, password) => {
  return async (dispatch) => {
    const userData = await postAdminLogin(uid, password);
    dispatch(updateUser(userData));
  };
};

export { dispatchRegisterUser, dispatchLoginUser };
