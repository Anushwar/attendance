/** @jsxImportSource @emotion/core */
import { Input, Button } from '@chakra-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { dispatchLoginUser } from '../../redux/triggers';

const Login = () => {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const admin = useSelector(({ adminData }) => adminData.user);
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatchLoginUser(uid, password)(dispatch);
    } catch (error) {
      //
    }
  };
  if (!admin) {
    return <Redirect to={path} />;
  }

  return (
    <form css={{ maxWidth: 300 }} onSubmit={handleSubmit}>
      <p>This is register page</p>
      <Input
        placeholder="uid"
        value={uid}
        onChange={(e) => {
          setUid(e.target.value);
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
        Register
      </Button>
    </form>
  );
};

export default Login;
