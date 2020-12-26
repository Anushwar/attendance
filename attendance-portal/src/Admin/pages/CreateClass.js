/** @jsxImportSource @emotion/core */

import { Input, Button, useToast, Select } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import JSONViewer from 'react-json-viewer';
import { Container } from '../../components';
import { getAdminTeachersList, postAdminCreateClass } from '../../redux/api';

const CreateClass = () => {
  const [classID, setClassID] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [tid, setTid] = useState();
  const [teacherList, setTeacherList] = useState([]);
  const [result, setResult] = useState();

  useEffect(async () => {
    const { data: teachers } = await getAdminTeachersList();
    setTeacherList(teachers);
  }, []);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: course } = await postAdminCreateClass(
        classID,
        semester,
        section,
        tid
      );
      setResult(course);
      toast({
        title: 'Sucessful',
        description: `Class created succesfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setResult();
      toast({
        title: 'Warning.',
        description: err?.response?.data?.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Container type="center" as="form" onSubmit={handleSubmit}>
      <p>Hello this is Class creation</p>
      CLass id
      <Input
        placeholder="Enter Class ID"
        value={classID}
        onChange={(e) => setClassID(e.target.value)}
      />
      Class Semester
      <Input
        placeholder="Enter Class Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      />
      Class Section
      <Input
        placeholder="Enter Class Section"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />
      Class Teacher
      <Select
        value={tid}
        placeholder="Select a teacher"
        onChange={(e) => setTid(e.target.value)}
      >
        {teacherList.map((teacher) => (
          <option key={teacher.tid} value={teacher.tid}>
            {`${teacher.name}(tid-${teacher.tid})`}
          </option>
        ))}
      </Select>
      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create Class
      </Button>
      {result && (
        <>
          Class Created succesfully
          <JSONViewer json={result} css={{ width: '100%' }} />
        </>
      )}
    </Container>
  );
};

export default CreateClass;
