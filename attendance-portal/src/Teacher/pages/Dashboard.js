/** @jsxImportSource @emotion/core */
import { Heading, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Container } from '../../components';

const DashboardContainer = styled(Container)({
  paddingTop: '3rem',
});

const Dashboard = () => {
  const { name } = useSelector(({ teacherData }) => teacherData.user);
  return (
    <DashboardContainer type="center">
      <Heading as="h2">{`Hello ${name},`}</Heading>
      <Text>03/11/2020, Monday</Text>
    </DashboardContainer>
  );
};

export default Dashboard;
