/** @jsxImportSource  @emotion/core */

import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login } from './pages';

const StudentRoute = ({ component, ...rest }) => {
  const student = useSelector(({ studentData }) => studentData.user);
  if (!student) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...rest} component={Login} />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={component} />;
};

StudentRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default StudentRoute;
