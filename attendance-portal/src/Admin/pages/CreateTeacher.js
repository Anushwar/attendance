/** @jsxImportSource @emotion/core */

import { Input, Button } from '@chakra-ui/core';
import { useState } from 'react';
import JSONViewer from 'react-json-viewer';
import { Container } from '../../components';
import { postAdminRegisterTeacher } from '../../redux/api';

const CreateTeacher = () => {
  const [tid, setTid] = useState('');
  const [password1, setPassword1] = useState('');
  const [name, setName] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setErrorMessage] = useState('');
  const [result, setResult] = useState();

  const handlleTid = (e) => {
    setTid(e.target.value);
  };
  const handlePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password1 !== password2) {
        throw new Error("Passwords don't match");
      }
      const { data: teacher } = await postAdminRegisterTeacher(
        tid,
        name,
        password1
      );
      setResult(teacher);
      setErrorMessage();
    } catch (err) {
      setResult();
      setErrorMessage(err.response.data.message);
    }
  };
  return (
    <Container type="center" as="form" onSubmit={handleSubmit}>
      <p>Hello this is teacher creation</p>
      tid
      <Input
        placeholder="Enter Teacher's id"
        value={tid}
        onChange={handlleTid}
      />
      name
      <Input
        placeholder="Enter Teacher's name"
        value={name}
        onChange={handleName}
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
      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create Teacher
      </Button>
      {error && (
        <>
          Error
          <h4>{error}</h4>
        </>
      )}
      {result && (
        <>
          Teacher Created succesfully
          <JSONViewer json={result} />
        </>
      )}
    </Container>
  );
};

export default CreateTeacher;
