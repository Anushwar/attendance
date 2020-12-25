/** @jsxImportSource @emotion/core */

import { Button } from '@chakra-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

const Dashboard = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <p>This is a Dashboard</p>
      <Link to={`${path}/create/teacher`}>
        <Button css={{ marginLeft: 20 }}>Create Teacher</Button>
      </Link>
      <Link to={`${path}/create/student`}>
        <Button css={{ marginLeft: 20 }}>Create Student</Button>
      </Link>
    </>
  );
};

export default Dashboard;
