import Login from './Login_Register/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Register from './Login_Register/Register';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import ShipperHome from './Shipper/Pages/SP_Home';
import DSDonHang from './NhanVien/DSDonHang';
import AdminRouter from './Admin/AdminRouter';
import { Margin, Padding } from '@mui/icons-material';
import CustomerRouter from './KhachHang/CustomerRouter';
import { render } from '@testing-library/react';


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          {/* <Route path="/customer" render={() => {
            return localStorage.getItem("accessToken") ? <Customer /> : <Redirect to="/login" />
          }}>
          </Route>
          <Route path="/customer-profile" render={() => {
            return localStorage.getItem("accessToken") ? <ProfileCustomer /> : <Redirect to="/login" />
          }}>
          </Route> */}
          <Route path="/customer" render={() => {
            return localStorage.getItem("accessToken") ? <CustomerRouter /> : <Redirect to="/login" />
          }}>
          </Route>
          <Route path="/shipper_home">
              <ShipperHome />
          </Route>
          <Route path="/danhsachdonhang">
            <DSDonHang />
          </Route>
          {/* <Route path="/trangchuadmin">
            <AdminRouter/>
          </Route> */}
          <Route path="*">
            404 not found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
