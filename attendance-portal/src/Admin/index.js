/** @jsxImportSource @emotion/core */

import { Switch, useRouteMatch } from 'react-router-dom';
import {
  Dashboard,
  CreateTeacher,
  CreateCourse,
  CreateClass,
  CreateStudent,
  CreateEnrollment,
  CreateSlot,
  TimeTable,
  TimeTables,
  CreateEnlistment,
} from './pages';
import AdminRoute from './AdminRoute';

const Admin = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <AdminRoute path={`${path}/create/teacher`} component={CreateTeacher} />
      <AdminRoute path={`${path}/create/course`} component={CreateCourse} />
      <AdminRoute path={`${path}/create/class`} component={CreateClass} />
      <AdminRoute
        path={`${path}/create/enrollment`}
        component={CreateEnrollment}
      />
      <AdminRoute path={`${path}/create/student`} component={CreateStudent} />
      <AdminRoute path={`${path}/create/slot`} component={CreateSlot} />
      <AdminRoute exact path={`${path}/timetable`} component={TimeTables} />
      <AdminRoute path={`${path}/timetable/:classID`} component={TimeTable} />
      <AdminRoute
        path={`${path}/create/enlistment`}
        component={CreateEnlistment}
      />
      <AdminRoute exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Admin;
