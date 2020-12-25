/** @jsxImportSource @emotion/core */

import { Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard } from './pages';
import StudentRoute from './StudentRoute';

const Student = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <StudentRoute exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Student;
