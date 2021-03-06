/** @jsxImportSource @emotion/core */

import { Input, Button, FormLabel, FormControl, Select } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import JSONViewer from 'react-json-viewer';
import { getAdminClassesList, postAdminRegisterStudent } from '../../redux/api';
import { Container } from '../../components';

const CreateStudent = () => {
  const [uid, setUid] = useState('');
  const [password1, setPassword1] = useState('');
  const [name, setName] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setErrorMessage] = useState('');
  const [classList, setClassList] = useState([]);
  const [classID, setClassID] = useState([]);
  const [result, setResult] = useState('');

  const handleUid = (e) => {
    setUid(e.target.value);
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

  useEffect(async () => {
    const { data: classes } = await getAdminClassesList();
    setClassList(classes);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password1 !== password2) {
        throw new Error("Passwords don't match");
      }
      const { data: student } = await postAdminRegisterStudent(
        uid,
        name,
        password1,
        classID
      );
      setResult(student);
      setErrorMessage();
    } catch (err) {
      setResult();
      setErrorMessage(err.response.data.message);
    }
  };
  return (
    <Container type="center" as="form" onSubmit={handleSubmit}>
      <p>Hello this is student creation</p>
      uid
      <Input
        placeholder="Enter Student's id"
        value={uid}
        onChange={handleUid}
      />
      name
      <Input
        placeholder="Enter Student's Name"
        value={name}
        onChange={handleName}
      />
      password
      <Input
        placeholder="Enter Student's Password"
        value={password1}
        onChange={handlePassword1}
      />
      password again
      <Input
        placeholder="Enter Student's Password again"
        value={password2}
        onChange={handlePassword2}
      />
      <FormControl>
        <FormLabel>Select a class</FormLabel>
        <Select
          value={classID}
          placeholder="Select a Class"
          onChange={(e) => setClassID(e.target.value)}
        >
          {classList.map((myClass) => (
            <option key={myClass.classID} value={myClass.classID}>
              {`${myClass.semester} - ${myClass.section} (teacherID-${myClass.tid})`}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create Student
      </Button>
      {error && (
        <>
          Error
          <h4>{error}</h4>
        </>
      )}
      {result && (
        <>
          Student Created succesfully
          <JSONViewer json={result} />
        </>
      )}
    </Container>
  );
};

export default CreateStudent;
