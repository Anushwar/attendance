import { addStudentDetails } from '../actions';
import { getStudentDetails } from '../api';

const dispatchAddStudentDetails = () => {
    return async (dispatch) => {
        const { data } = await getStudentDetails();
        console.log(await getStudentDetails());
        dispatch(addStudentDetails(data));
    }
}

export { dispatchAddStudentDetails };