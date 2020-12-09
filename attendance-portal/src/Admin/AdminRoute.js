/** @jsxImportSource  @emotion/core */

import { useSelector } from 'react-redux';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminRoute = ({ component, ...rest }) => {
  const admin = useSelector(({ adminData }) => adminData.user);
  const { path } = useRouteMatch();
  if (!admin) {
    return <Redirect to={`${path}/login`} />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={component} />;
};

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AdminRoute;
