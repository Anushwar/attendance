/** @jsxImportSource @emotion/core */

import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard } from './pages';
import { Details } from './components'

const Student = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={Dashboard} />
            <Route exact path={`${path}/details`} component={Details} />
        </Switch>
    );
};

export default Student;