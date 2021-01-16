/** @jsxImportSource @emotion/core */

import { Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard, Course, Attendance, Mark } from './pages';
import TeacherRoute from './TeacherRoute';

const Teacher = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <TeacherRoute
        path={`${path}/mark/:classID/:courseID/:slotID`}
        component={Mark}
      />
      <TeacherRoute
        path={`${path}/:classID/:courseID/:attendanceID`}
        component={Attendance}
      />
      <TeacherRoute path={`${path}/:classID/:courseID`} component={Course} />
      <TeacherRoute exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Teacher;
