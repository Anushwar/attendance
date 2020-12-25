import { UPDATE_STUDENT_USER } from '../actions';

const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STUDENT_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default studentReducer;
