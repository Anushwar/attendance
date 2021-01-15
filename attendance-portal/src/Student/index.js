/** @jsxImportSource @emotion/core */

import { Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard, Card } from './pages';
import StudentRoute from './StudentRoute';

const Student = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <StudentRoute exact path={path} component={Dashboard} />
      <StudentRoute path={`${path}/:courseID`} component={Card} />
    </Switch>
  );
};

export default Student;
