/** @jsxImportSource @emotion/core */

import { Text, Heading } from '@chakra-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import { dispatchLoadCourseOfTeacher } from '../../redux/triggers';

const Course = () => {
  const { courseID, classID } = useParams();
  const course = useSelector(({ teacherData }) => teacherData.course);
  const { semester, section, courseName, courseDescription } = course;
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatchLoadCourseOfTeacher(classID, courseID)(dispatch);
  }, [courseID, classID]);
  return (
    <Container type="center" css={{ paddingTop: '3rem' }}>
      <Heading>{courseName}</Heading>
      <Text>{courseDescription}</Text>
      <br />
      <Text fontSize="lg">{`Class: ${semester}/${section}`}</Text>
      <Text fontSize="lg">{`Subject Code: ${courseID}`}</Text>
    </Container>
  );
};

export default Course;
