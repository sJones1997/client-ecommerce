import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Homepage from '../features/homepage/Homepage';
import Login from '../features/login/Login';
import Register from '../features/register/Register';
export const baseUrl = 'http://localhost:3000/'

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
