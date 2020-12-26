/** @jsxImportSource @emotion/core */

import { Heading, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Container } from '../../components';

const DashboardContainer = styled(Container)({
  paddingTop: '3rem',
});

const Dashboard = () => {
  const { name } = useSelector(({ studentData }) => studentData.user);
  return (
    <DashboardContainer type="center">
      <Heading as="h2">{`Hello ${name},`}</Heading>
      <Text>14/04/2000, Friday</Text>
    </DashboardContainer>
  );
};

export default Dashboard;
