/** @jsxImportSource @emotion/core */

import { Input } from '@chakra-ui/core';
import { useState } from 'react';
import { Container } from '../../components';

const CreateTeacher = () => {
  const [tid, setTid] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  // const [error, setErrorMessage] = useState('');

  const handlleTid = (e) => {
    setTid(e.target.value);
  };
  const handlePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  return (
    <Container type="center">
      tid
      <Input
        placeholder="Enter Teacher's id"
        value={tid}
        onChange={handlleTid}
      />
      password
      <Input
        placeholder="Enter Teacher Password"
        value={password1}
        onChange={handlePassword1}
      />
      password again
      <Input
        placeholder="Enter Teacher Password again"
        value={password2}
        onChange={handlePassword2}
      />
    </Container>
  );
};

export default CreateTeacher;
