/** @jsxImportSource @emotion/core */

import { Switch, useRouteMatch } from 'react-router-dom';
import {
  Dashboard,
  CreateTeacher,
  CreateCourse,
  CreateClass,
  CreateEnrollment,
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
      <AdminRoute exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Admin;
