import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './app.css';
import Homepage from '../features/homepage/Homepage';
import Login from '../features/login/Login';
import Register from '../features/register/Register';
export const baseUrl = 'http://localhost:3001/api'

function App() {

  return (
    <div className="App">
      <Router>         
        <main>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>          
        </main>
      </Router>
    </div>
  );
}

export default App;
