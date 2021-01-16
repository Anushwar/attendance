/** @jsxImportSource @emotion/core */
import { Button } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateAdminUser,
  updateStudentUser,
  updateTeacherUser,
} from '../redux/actions';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: 30,
});

const HomeButton = styled(Button)({
  marginTop: 30,
  width: '100%',
});

const Admin = () => {
  const dispatch = useDispatch();
  const adminUser = useSelector(({ adminData }) => adminData.user);
  const teacherUser = useSelector(({ teacherData }) => teacherData.user);
  const studentUser = useSelector(({ studentData }) => studentData.user);
  return (
    <Container>
      <Link
        to="/admin"
        onClick={() => {
          if (adminUser) dispatch(updateAdminUser(adminUser));
        }}
      >
        <HomeButton>Admin Dashboard</HomeButton>
      </Link>
      <Link
        to="/student"
        onClick={() => {
          if (studentUser) dispatch(updateStudentUser(studentUser));
        }}
      >
        <HomeButton>Student Dashboard</HomeButton>
      </Link>
      <Link
        to="/teacher"
        onClick={() => {
          if (teacherUser) dispatch(updateTeacherUser(teacherUser));
        }}
      >
        <HomeButton>Teacher Dashboard</HomeButton>
      </Link>
    </Container>
  );
};

export default Admin;
