/** @jsxImportSource @emotion/core */

import { Heading, Input, Button, useToast } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '../../components';
import { dispatchLoginStudentUser } from '../../redux/triggers';

const LoginContainer = styled(Container)({
  paddingTop: '3rem',
  paddingBottom: '3rem',
  textAlign: 'center',
});

const LoginForm = styled.form({
  width: '100%',
  textAlign: 'left',
  maxWidth: 500,
  marginTop: '3rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '3rem',
  paddingRight: '3rem',
});

const LoginButton = styled(Button)({
  width: '100%',
});

const Login = () => {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (uid.length < 5) {
        toast({
          title: 'An error occurred.',
          description: 'Student ID is usually longer than 5 characters',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (password.length < 5) {
        toast({
          title: 'An error occurred.',
          description: 'Password is usually longer than 5 characters',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      await dispatchLoginStudentUser(uid, password)(dispatch);
      toast({
        title: 'Account Logged in',
        description: 'Account logged in successfully.',
        status: 'success',
        duration: '5000',
        isClosable: 'true',
      });
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error?.response?.data?.message,
        status: 'error',
        duration: '5000',
        isClosable: 'true',
      });
    }
  };

  return (
    <LoginContainer type="center">
      <Heading as="h2">Login as Student</Heading>
      <LoginForm as="form" onSubmit={handleSubmit}>
        <Heading as="h5" size="sm">
          Student ID:
        </Heading>
        <Input
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="Enter your Student ID"
        />
        <br />
        <Heading as="h5" size="sm">
          Password:
        </Heading>
        <Input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />
        <br />
        <LoginButton type="submit">Student Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
