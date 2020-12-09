/** @jsxImportSource @emotion/core */
import { Input, Button } from '@chakra-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { dispatchLoginAdminUser } from '../../redux/triggers';

const Login = () => {
  const [aid, setAid] = useState('');
  const [password, setPassword] = useState('');
  const admin = useSelector(({ adminData }) => adminData.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatchLoginAdminUser(aid, password)(dispatch);
    } catch (error) {
      //
    }
  };
  if (admin) {
    return <Redirect to="/admin" />;
  }

  return (
    <form css={{ maxWidth: 300 }} onSubmit={handleSubmit}>
      <p>This is login page</p>
      <Input
        placeholder="aid"
        value={aid}
        onChange={(e) => {
          setAid(e.target.value);
        }}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" css={{ width: '100%', marginTop: 10 }}>
        Login
      </Button>
    </form>
  );
};

export default Login;
