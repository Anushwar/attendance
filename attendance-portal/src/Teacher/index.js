/** @jsxImportSource @emotion/core */

import { Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard, Class } from './pages';
import TeacherRoute from './TeacherRoute';

const Teacher = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <TeacherRoute path={`${path}/class/:id`} component={Class} />
      <TeacherRoute exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Teacher;
