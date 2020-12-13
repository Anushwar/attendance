import { UPDATE_TEACHER_USER } from '../actions';

const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TEACHER_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default teacherReducer;
