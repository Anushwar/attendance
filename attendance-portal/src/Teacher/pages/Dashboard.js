/** @jsxImportSource @emotion/core */
import { Heading, Text, Grid } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../components';
import {
  dispatchLoadCoursesTeacher,
  dispatchLoadCoursesTeacherToday,
} from '../../redux/triggers/teacher';

const DashboardContainer = styled(Container)({
  paddingTop: '3rem',
});

const Course = styled.div(({ theme }) => {
  const { speeds, colors, radii } = theme;
  return {
    width: '100%',
    borderRadius: radii.lg,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 150,
    justifyContent: 'space-between',
    border: `0.1px solid ${colors.gray[100]}`,
    userSelect: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: `all ${speeds.default}ms ease`,
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
  };
});

const Dashboard = () => {
  const name = useSelector(({ teacherData }) => teacherData.user.name);
  const tid = useSelector(({ teacherData }) => teacherData.user.tid);
  const courses = useSelector(({ teacherData }) => teacherData.courses);
  const coursesToday = useSelector(
    ({ teacherData }) => teacherData.coursesToday
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchLoadCoursesTeacher()(dispatch);
    dispatchLoadCoursesTeacherToday()(dispatch);
  }, [tid]);
  return (
    <DashboardContainer type="center">
      <Heading as="h2">{`Hello ${name},`}</Heading>
      <Text>03/11/2020, Monday</Text>
      <br />
      <Heading as="h3" size="lg">
        Today:
      </Heading>
      <br />
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={5}>
        {coursesToday?.map(
          ({
            classID,
            courseName,
            section,
            semester,
            courseID,
            startTime,
            endTime,
          }) => {
            return (
              <Course key={`${classID}-${courseID}`}>
                <Text fontSize="sm" color="gray.500">
                  {`${courseID} / ${semester} - ${section}`}
                </Text>
                <Text
                  fontSize="lg"
                  textAlign="center"
                  fontWeight="medium"
                  color="gray.600"
                  paddingTop={2.5}
                  paddingBottom={2.5}
                >
                  {courseName}
                </Text>
                <Text textAlign="right" color="gray.500">
                  {`${startTime}-${endTime}`}
                </Text>
              </Course>
            );
          }
        )}
      </Grid>
      <br />
      <Heading as="h3" size="lg">
        Courses:
      </Heading>
      <br />
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={5}>
        {courses?.map(
          ({ classID, courseName, section, semester, courseID }) => {
            return (
              <Course key={`${classID}-${courseID}`}>
                <Text fontSize="sm" color="gray.500">
                  {courseID}
                </Text>
                <Text
                  fontSize="lg"
                  textAlign="center"
                  fontWeight="medium"
                  color="gray.600"
                  paddingTop={2.5}
                  paddingBottom={2.5}
                >
                  {courseName}
                </Text>
                <Text textAlign="right" color="gray.500">
                  {`${semester} - ${section}`}
                </Text>
              </Course>
            );
          }
        )}
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
