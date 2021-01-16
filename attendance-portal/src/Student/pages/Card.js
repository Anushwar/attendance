import { Text, Heading, useTheme, Stack, Box } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import {
  dispatchLoadCourseOfStudent,
  dispatchLoadCourseAttendanceOfStudent,
} from '../../redux/triggers/student';

const Cardcontainer = styled(Container)({
  paddingTop: '3rem',
});

const Card = () => {
  const { courseID } = useParams();
  const course = useSelector(({ studentData }) => studentData.course);
  const attendance = useSelector(({ studentData }) => studentData.attendance);
  const { colors } = useTheme();
  const { courseName, courseDescription } = course;
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatchLoadCourseOfStudent(courseID)(dispatch);
    await dispatchLoadCourseAttendanceOfStudent(courseID)(dispatch);
  }, [courseID]);

  return (
    <Cardcontainer type="center">
      <Heading>{courseName}</Heading>
      <Text>{courseDescription}</Text>
      <br />
      <Text fontsize="lg">{`Subject Code: ${courseID}`}</Text>
      <br />
      <Heading as="h3" size="lg">
        Previous Attendance Details:
      </Heading>
      <br />
      <Stack spacing={2} align="stretch">
        {attendance.map(({ startTime, name, endTime, date, attendanceID }) => {
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
            >
              <Text>{`${name} (${startTime}-${endTime}) - ${date}`}</Text>
            </Box>
          );
        })}
      </Stack>
    </Cardcontainer>
  );
};

export default Card;
