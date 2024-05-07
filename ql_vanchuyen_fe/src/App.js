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
import ProfileCustomer from './KhachHang/ProfileCustomer';
import OrderDetails from './KhachHang/OrderDetails';
import ShipperHome from './Shipper/Pages/SP_Home';
import DSDonHang from './NhanVien/DSDonHang';
import OrderList from './KhachHang/OrderList';
import TrangChu_Admin from './Admin/TrangChu_Admin';
import AdminRouter from './Admin/AdminRouter';
import { Margin, Padding } from '@mui/icons-material';


function App() {
  return (
    <Router>
      <div>
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
          <Route path="/customer-profile" render={() => {
            return localStorage.getItem("accessToken") ? <ProfileCustomer /> : <Redirect to="/login" />
          }}>
          </Route>
          <Route path="/order-details">
            <OrderDetails />
          </Route>
          <Route path="/shipper_home">
              <ShipperHome />
          </Route>
          <Route path="/danhsachdonhang">
            <DSDonHang />
          </Route>
          <Route path="/order-list">
            <OrderList />
          </Route>
          <Route path="/trangchuadmin">
            <AdminRouter/>
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
