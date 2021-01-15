import { Text, Heading } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import { dispatchLoadCourseOfStudent } from '../../redux/triggers/student';

const Cardcontainer = styled(Container)({
  paddingTop: '3rem',
});

const Card = () => {
  const { courseID } = useParams();
  const course = useSelector(({ studentData }) => studentData.course);
  const { courseName, courseDescription } = course;
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatchLoadCourseOfStudent(courseID)(dispatch);
  }, [courseID]);

  return (
    <Cardcontainer type="center">
      <Heading>{courseName}</Heading>
      <Text>{courseDescription}</Text>
      <br />
      <Text fontsize="lg">{`Subject Code: ${courseID}`}</Text>
    </Cardcontainer>
  );
};

export default Card;
