/** @jsxImportSource @emotion/core */

import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Login, Dashboard, CreateTeacher } from './pages';
import AdminRoute from './AdminRoute';

const Admin = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/login`} component={Login} />
      <Route path={`${path}/create/teacher`} component={CreateTeacher} />
      <AdminRoute exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Admin;
