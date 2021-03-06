/** @jsxImportSource @emotion/core */

import { Grid, Heading, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { Container } from '../../components';
import { dispatchLoadCoursesStudent } from '../../redux/triggers/student';

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
    padding: '1rem',
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
  const name = useSelector(({ studentData }) => studentData.user.name);
  const uid = useSelector(({ studentData }) => studentData.user.uid);
  const courses = useSelector(({ studentData }) => studentData.courses);
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  useEffect(() => {
    dispatchLoadCoursesStudent()(dispatch);
  }, [uid]);
  return (
    <DashboardContainer type="center">
      <Heading as="h2">{`Hello ${name},`}</Heading>
      <Text>14/04/2000, Friday</Text>
      <br />
      <br />
      <Heading as="h3" size="lg">
        Courses :
      </Heading>
      <br />
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={5}>
        {courses?.map(
          ({ classID, courseName, section, semester, courseID }) => {
            return (
              <Link to={`${path}/${courseID}`} key={courseID} style={{}}>
                <Course key={`${classID}-${courseID}`}>
                  <Text fontSize="sm" color="gray.500">
                    {courseID}
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="center"
                    fontWeight="medium"
                    color="gray.700"
                    paddingTop={2.5}
                    paddingBottom={2.5}
                  >
                    {courseName}
                  </Text>
                  <Text textAlign="right" color="gray.500">
                    {`${semester} - ${section}`}
                  </Text>
                </Course>
              </Link>
            );
          }
        )}
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
