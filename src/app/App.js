import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './app.css';
import Homepage from '../features/homepage/Homepage';
import Login from '../features/login/Login';
import Register from '../features/register/Register';
import ProductPage from '../features/productPage/productPage';
import Orders from '../features/orders/Orders';
import Cart from '../features/cart/Cart';
import Navbar from '../components/navbar/navbar';
import { checkForSession, sessionCheck } from "../features/login/loginSlice";
import { regSessionActive } from "../features/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export const baseUrl = 'http://localhost:3001/api'

function App() {
  
  const dispatch = useDispatch();
  const sessionActive = useSelector(sessionCheck);
  const regSesstion = useSelector(regSessionActive)

  useEffect(() => {
    dispatch(checkForSession());
  }, [sessionActive, dispatch]);

  return (
    <div className="App">
      <Router>         
        <header>
          {sessionActive || regSesstion ? <Navbar /> : ''}
        </header>  
        <main>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/product/:id' component={ProductPage} />   
            <Route exact path="/orders" component={Orders} />
            <Route exact path='/cart' component={Cart} />        
          </Switch>          
        </main>
      </Router>
    </div>
  );
}

export default App;
