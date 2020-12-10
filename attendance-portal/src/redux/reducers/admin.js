import { UPDATE_ADMIN_USER } from '../actions';

// TODO: for testing purposes only REMOVE
const adminReducer = (
  state = { user: { aid: 'admin', password: 'admin' } },
  action
) => {
  switch (action.type) {
    case UPDATE_ADMIN_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default adminReducer;
