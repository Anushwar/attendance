import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from '../Admin';
import Teacher from '../Teacher';
import Student from '../Student';
import Home from '../Home';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/student" component={Student} />
      <Route path="/teacher" component={Teacher} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
