/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/core */
import { Text, Heading, Box, useTheme, Stack, Grid } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import {
  dispatchLoadStudentAttendance,
  dispatchLoadAttendanceDetails,
} from '../../redux/triggers';

const Attendance = () => {
  const [isLoading, setLoading] = useState(false);

  const { courseID, classID, attendanceID } = useParams();

  const attendance = useSelector(({ teacherData }) => teacherData.attendance);
  const {
    date,
    semester,
    section,
    name,
    startTime,
    endTime,
    courseName,
    courseHoursLecture,
    courseHoursTutorial,
    courseHoursPractical,
    courseCredits,
  } = attendance;
  const students = useSelector(({ teacherData }) => teacherData.student);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  useEffect(async () => {
    await dispatchLoadStudentAttendance(attendanceID)(dispatch);
    await dispatchLoadAttendanceDetails(
      classID,
      courseID,
      attendanceID
    )(dispatch);
  }, [attendanceID]);

  return isLoading ? (
    <div />
  ) : (
    <Container type="center" css={{ paddingTop: '3rem' }}>
      <Heading>{`Class: ${semester}-${section}`}</Heading>
      <Text fontSize="lg">{`Course: ${courseName}`}</Text>
      <Text fontSize="lg">{`LTPC: ${courseHoursLecture}/${courseHoursTutorial}/${courseHoursPractical}/${courseCredits}`}</Text>
      <Text fontSize="lg">{`Subject Code: ${courseID}`}</Text>
      <Text fontSize="lg">{`Session Time: ${name} (${startTime}-${endTime})`}</Text>
      <Text fontSize="lg">{`Date: ${date}`}</Text>
      <br />
      <Heading as="h3" size="lg">
        Student status:
      </Heading>
      <br />
      <Grid spacing={2} gridTemplateColumns="3fr 1fr">
        {students.map(({ isPresent, uid, name: studentName }) => {
          return (
            <>
              <Box
                key={uid}
                p={2}
                borderWidth="1px"
                css={{
                  cursor: 'pointer',
                }}
              >
                <Text>{`${uid} - ${studentName}`}</Text>
              </Box>
              <Box
                key={`${uid}1`}
                p={2}
                borderWidth="1px"
                css={{
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <Text>{isPresent ? 'Present' : 'Absent'}</Text>
              </Box>
            </>
          );
        })}
      </Grid>
      <br />
    </Container>
  );
};

export default Attendance;
