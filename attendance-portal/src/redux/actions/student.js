export const ADD_STUDENT_DETAILS = 'ADD_STUDENT_DETAILS';
export const UPDATE_STUDENT_USER = 'UPDATE_STUDENT_USER';

export const addStudentDetails = (details) => ({
  type: ADD_STUDENT_DETAILS,
  details,
});

export const updateStudentUser = (user) => ({
  type: UPDATE_STUDENT_USER,
  user,
});
