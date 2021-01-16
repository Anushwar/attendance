/** @jsxImportSource @emotion/core */

import {
  Text,
  Heading,
  Box,
  useTheme,
  Grid,
  Checkbox,
  Stack,
  Button,
  useToast,
} from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import {
  getTeacherStudents,
  postTeacherStudentAttendance,
} from '../../redux/api';
import { dispatchLoadCourseOfTeacher } from '../../redux/triggers';

const Course = () => {
  const [isLoading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const { courseID, classID, slotID } = useParams();

  const course = useSelector(({ teacherData }) => teacherData.course);
  const { semester, section, courseName, courseDescription } = course;

  const dispatch = useDispatch();
  const { colors } = useTheme();
  const toast = useToast();

  useEffect(async () => {
    try {
      await dispatchLoadCourseOfTeacher(classID, courseID)(dispatch);
      const { data: studentsData } = await getTeacherStudents(
        classID,
        courseID
      );
      setStudents(
        studentsData.map((student) => ({ ...student, isPresent: true }))
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [courseID, classID]);

  const handleCheckBoxPresent = (index) => {
    const newStudents = [...students];
    newStudents[index].isPresent = true;
    setStudents(newStudents);
  };

  const handleCheckBoxAbsent = (index) => {
    const newStudents = [...students];
    newStudents[index].isPresent = false;
    setStudents(newStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postTeacherStudentAttendance(
        classID,
        courseID,
        slotID,
        students.map(({ uid, isPresent }) => ({ uid, isPresent }))
      );
      toast({
        title: 'Sucessful',
        description: `Course ${courseName} created`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Warning.',
        description: err?.response?.data?.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return isLoading ? (
    <div />
  ) : (
    <Container type="center" css={{ paddingTop: '3rem' }}>
      <Heading>{courseName}</Heading>
      <Text>{courseDescription}</Text>
      <br />
      <Text fontSize="lg">{`Class: ${semester}/${section}`}</Text>
      <Text fontSize="lg">{`Subject Code: ${courseID}`}</Text>
      <br />
      <Heading as="h3" size="lg">
        Mark attendance:
      </Heading>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid gridTemplateColumns="3fr 0.5fr">
          {students.map(({ name, uid, isPresent }, index) => {
            return (
              <>
                <Box
                  key={uid}
                  p={2}
                  borderWidth="1px"
                  css={{
                    cursor: 'pointer',
                    '&:nth-of-type(even)': {
                      background: colors.gray[100],
                    },
                  }}
                >
                  <Text>{`${name} - ${uid}`}</Text>
                </Box>
                <Stack
                  spacing={10}
                  direction="row"
                  borderWidth="1px"
                  padding={2}
                  css={{ textAlign: 'center' }}
                >
                  <Checkbox
                    colorScheme="red"
                    isChecked={isPresent}
                    onChange={() => handleCheckBoxPresent(index)}
                  >
                    Present
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    isChecked={!isPresent}
                    onChange={() => handleCheckBoxAbsent(index)}
                  >
                    Absent
                  </Checkbox>
                </Stack>
              </>
            );
          })}
        </Grid>
        <Button
          css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
          type="submit"
        >
          Mark Attendance
        </Button>
      </form>
    </Container>
  );
};

export default Course;
