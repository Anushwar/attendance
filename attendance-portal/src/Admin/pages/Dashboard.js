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
      <Link to={`${path}/create/course`}>
        <Button css={{ marginLeft: 20 }}>Create Course</Button>
      </Link>
      <Link to={`${path}/create/class`}>
        <Button css={{ marginLeft: 20 }}>Create Class</Button>
      </Link>
      <Link to={`${path}/create/enrollment`}>
        <Button css={{ marginLeft: 20 }}>Create Enrollment</Button>
      </Link>
      <Link to={`${path}/create/student`}>
        <Button css={{ marginLeft: 20 }}>Create Student</Button>
      </Link>
      <Link to={`${path}/create/slot`}>
        <Button css={{ marginLeft: 20 }}>Create Slot</Button>
      </Link>
      <Link to={`${path}/timetable`}>
        <Button css={{ marginLeft: 20 }}>Timetables</Button>
      </Link>
      <Link to={`${path}/create/enlistment`}>
        <Button css={{ marginLeft: 20 }}>Create Enlistment</Button>
      </Link>
    </>
  );
};

export default Dashboard;
