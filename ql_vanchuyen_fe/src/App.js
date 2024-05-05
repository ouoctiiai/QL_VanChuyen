import Login from './Login_Register/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Register from './Login_Register/Register';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Customer from './KhachHang/Customer';


function App() {
  return (
    <Router>
      <div className='container'  style={{ display: 'flex', justifyContent: 'center' }}>
      <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path="/news">
              News
            </Route>
            <Route path="/contact">
              Contact
            </Route>
            <Route path="/about">
              About
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/customer" render={() => {
                return localStorage.getItem("accessToken") ? <Customer /> : <Redirect to="/login" />
            }}>
            </Route>
            <Route path="*">
              404 not found
            </Route>
          </Switch>
    </div>
    </Router>
  );
}

export default App;
