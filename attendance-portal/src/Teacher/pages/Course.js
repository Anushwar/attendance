/** @jsxImportSource @emotion/core */

import { Text, Heading, Box, useTheme } from '@chakra-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import {
  dispatchLoadCourseOfTeacher,
  dispatchLoadAttendancesOfTeacher,
} from '../../redux/triggers';

const Course = () => {
  const { courseID, classID } = useParams();

  const course = useSelector(({ teacherData }) => teacherData.course);
  const attendance = useSelector(({ teacherData }) => teacherData.attendances);
  const { semester, section, courseName, courseDescription } = course;

  const dispatch = useDispatch();
  const { colors } = useTheme();

  useEffect(async () => {
    await dispatchLoadCourseOfTeacher(classID, courseID)(dispatch);
    await dispatchLoadAttendancesOfTeacher(classID, courseID)(dispatch);
  }, [courseID, classID]);
  return (
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
      <div>
        {attendance.map(({ startTime, endTime, date, attendanceID }) => {
          return (
            <Box
              key={attendanceID}
              p={3}
              borderWidth="1px"
              css={{
                cursor: 'pointer',
                '&:nth-child(even)': {
                  background: colors.gray[100],
                },
              }}
            >
              <Text>{`${startTime}-${endTime} ${date}`}</Text>
            </Box>
          );
        })}
      </div>
      <br />
      <Heading as="h3" size="lg">
        Students:
      </Heading>
      <br />
      <div>
        {attendance.map(({ startTime, endTime, date, attendanceID }) => {
          return (
            <Box
              key={attendanceID}
              p={3}
              borderWidth="1px"
              css={{
                cursor: 'pointer',
                '&:nth-child(even)': {
                  background: colors.gray[100],
                },
              }}
            >
              <Text>{`${startTime}-${endTime} ${date}`}</Text>
            </Box>
          );
        })}
      </div>
    </Container>
  );
};

export default Course;
