/** @jsxImportSource @emotion/core */

import {
  Button,
  useToast,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import JSONViewer from 'react-json-viewer';
import { Container } from '../../components';
import {
  getAdminCoursesList,
  getAdminEnlistmentsList,
  getAdminStudentsList,
  postAdminEnlistment,
} from '../../redux/api';

const CreateEnlistment = () => {
  const [courseID, setCourseID] = useState('');
  const [uid, setUid] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [enlistmentsList, setEnlistmentsList] = useState([]);
  const [result, setResult] = useState();

  useEffect(async () => {
    const { data: students } = await getAdminStudentsList();
    setStudentsList(students);
    const { data: courses } = await getAdminCoursesList();
    setCoursesList(courses);
    const { data: enlistments } = await getAdminEnlistmentsList();
    setEnlistmentsList(enlistments);
  }, []);

  let applicableCoursesList = null;
  if (!enlistmentsList) {
    applicableCoursesList = coursesList;
  } else {
    const enlistedCourseIDList = enlistmentsList
      .filter((enlistment) => enlistment.uid === uid)
      .map((enlistment) => enlistment.courseID);
    if (enlistedCourseIDList.length === 0) {
      applicableCoursesList = coursesList;
    } else {
      applicableCoursesList = coursesList.filter(
        (enlistment) => !enlistedCourseIDList.includes(enlistment.courseID)
      );
    }
  }
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: enlistment } = await postAdminEnlistment(uid, courseID);
      setResult(enlistment);
      toast({
        title: 'Successful',
        description: `Enlistment created successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEnlistmentsList([...enlistmentsList, enlistment]);
      setCourseID();
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
      <p>Hello this is enlistments</p>
      <FormControl>
        <FormLabel>Select a student</FormLabel>
        <Select
          value={uid}
          placeholder="Select a student"
          onChange={(e) => setUid(e.target.value)}
        >
          {studentsList.map((student) => (
            <option key={student.uid} value={student.uid}>
              {`${student.name}(uid-${student.uid})`}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Select a course</FormLabel>
        <Select
          value={courseID}
          placeholder="Select a course"
          onChange={(e) => setCourseID(e.target.value)}
        >
          {applicableCoursesList.map((course) => (
            <option key={course.courseID} value={course.courseID}>
              {`${course.courseName}(courseID-${course.courseID})`}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create Enlistment.
      </Button>
      {studentsList && (
        <>
          Students:
          <JSONViewer json={studentsList} css={{ width: '100%' }} />
        </>
      )}
      {coursesList && (
        <>
          Courses:
          <JSONViewer json={coursesList} css={{ width: '100%' }} />
        </>
      )}
      {enlistmentsList && (
        <>
          Enlistments:
          <JSONViewer json={enlistmentsList} css={{ width: '100%' }} />
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

export default CreateEnlistment;
