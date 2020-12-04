/** @jsxImportSource @emotion/core */

import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Login, Dashboard, Class } from './pages';

const Teacher = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/class/:id`} component={Class} />
      <Route path={`${path}/login`} component={Login} />
      <Route exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Teacher;
