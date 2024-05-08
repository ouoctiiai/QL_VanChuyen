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
import Customer from './KhachHang/Home/Customer';
import ProfileCustomer from './KhachHang/Profile/ProfileCustomer';
import OrderDetails from './KhachHang/OrderDetails/OrderDetails';
import DSDonCho from './Shipper/Pages/SP_Home';
import DSDonHang from './NhanVien/DSDonHang';
import OrderList from './KhachHang/OrderList/OrderList';
import CustomerRouter from './KhachHang/CustomerRouter';


function App() {
  return;
  // return (
  //   <Router>
  //     <CustomerRouter />
  //     <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
  //       <Switch>
  //         <Route exact path="/">
  //           Home
  //         </Route>
  //         <Route path="/login">
  //           <Login />
  //         </Route>
  //         <Route path="/register">
  //           <Register />
  //         </Route>
  //         <Route path="/customer" render={() => {
  //           return localStorage.getItem("accessToken") ? <Customer /> : <Redirect to="/login" />
  //         }}>
  //         </Route>
  //         <Route path="/customer-profile" render={() => {
  //           return localStorage.getItem("accessToken") ? <ProfileCustomer /> : <Redirect to="/login" />
  //         }}>
  //         </Route>
  //         <Route path="/danhsachdoncho">
  //           <DSDonCho />
  //         </Route>
  //         <Route path="/danhsachdonhang">
  //           <DSDonHang />
  //         </Route>
  //         <Route path="*">
  //           404 not found
  //         </Route>
  //       </Switch>
  //     </div>
  //   </Router>
  // );
}

export default App;
