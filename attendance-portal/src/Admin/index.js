/** @jsxImportSource @emotion/core */

import { Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard, CreateTeacher } from './pages';
import AdminRoute from './AdminRoute';

const Admin = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <AdminRoute path={`${path}/create/teacher`} component={CreateTeacher} />
      <AdminRoute exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Admin;
