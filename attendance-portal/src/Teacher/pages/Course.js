/** @jsxImportSource @emotion/core */

import { Text, Heading, Box, useTheme, Stack } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Container } from '../../components';
import {
  dispatchLoadCourseOfTeacher,
  dispatchLoadAttendancesOfTeacher,
  dispatchLoadStudentsOfTeacher,
} from '../../redux/triggers';

const Mark = () => {
  const [isLoading, setLoading] = useState(true);

  const { courseID, classID } = useParams();

  const course = useSelector(({ teacherData }) => teacherData.course);
  const { semester, section, courseName, courseDescription } = course;

  const attendance = useSelector(({ teacherData }) => teacherData.attendances);
  const students = useSelector(({ teacherData }) => teacherData.students);

  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { colors } = useTheme();

  useEffect(async () => {
    try {
      await dispatchLoadCourseOfTeacher(classID, courseID)(dispatch);
      await dispatchLoadAttendancesOfTeacher(classID, courseID)(dispatch);
      await dispatchLoadStudentsOfTeacher(classID, courseID)(dispatch);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [courseID, classID]);
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
        Previous records:
      </Heading>
      <br />
      <Stack spacing={2} align="stretch">
        {attendance.map(({ startTime, endTime, date, attendanceID }) => {
          return (
            <Box
              key={attendanceID}
              p={2}
              borderWidth="1px"
              css={{
                cursor: 'pointer',
                '&:nth-of-type(even)': {
                  background: colors.gray[100],
                },
              }}
              onClick={() => history.push(`${url}/${attendanceID}`)}
            >
              <Text>{`Session : ${startTime}-${endTime}, Updated at: ${date}`}</Text>
            </Box>
          );
        })}
      </Stack>
      <br />
      <Heading as="h3" size="lg">
        Students:
      </Heading>
      <br />
      <Stack spacing={2} align="stretch">
        {students.map(({ name, uid }) => {
          return (
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
          );
        })}
      </Stack>
    </Container>
  );
};

export default Mark;
