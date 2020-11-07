/** @jsxImportSource @emotion/core */

import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Register, Login, Dashboard } from './pages';

const Admin = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
    <Route path={`${path}/register`} component={Register} />
    <Route path={`${path}/login`} component={Login} />
    <Route exact path={path} component={Dashboard} />
  </Switch>
  );
};

export default Admin;
