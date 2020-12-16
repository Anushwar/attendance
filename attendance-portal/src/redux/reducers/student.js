import { ADD_STUDENT_DETAILS } from '../actions';

const studentReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_STUDENT_DETAILS :
            return {...state, details: action.details};
        default:
            return state;
    }
}

export default studentReducer;