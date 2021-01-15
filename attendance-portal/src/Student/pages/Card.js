import { Text, Heading } from '@chakra-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import { dispatchLoadCourseOfStudent } from '../../redux/triggers/student';

const Card = () => {
  const { courseID } = useParams();
  const course = useSelector(({ studentData }) => studentData.course);
  const { courseName } = course;
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatchLoadCourseOfStudent(courseID)(dispatch);
  }, [courseID]);

  return (
    <Container type="center">
      <Heading>{courseName}</Heading>
      <br />
      <Text fontsize="lg">{`Subject Code: ${courseID}`}</Text>
    </Container>
  );
};

export default Card;
