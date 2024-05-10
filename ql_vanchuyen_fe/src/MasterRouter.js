import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import { memo } from 'react';

import Login from './Login_Register/Login';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Routes
// } from "react-router-dom";
import Register from './Login_Register/Register';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import ShipperHome from './Shipper/Pages/SP_Home';
import DSDonHang from './NhanVien/DSDonHang';
import AdminRouter from './Admin/AdminRouter';
import "./Admin/index.css";
import { Margin, Padding } from '@mui/icons-material';
import { render } from '@testing-library/react';
import Customer from './KhachHang/Home/Customer';
import ProfileCustomer from './KhachHang/Profile/ProfileCustomer';
import OrderList from './KhachHang/OrderList/OrderList';
import MasterLayout from './MasterLayout';
import { ROUTERS } from './Path/router';
import CreateOrder from './KhachHang/CreateOrder/CreateOrder';
import OrderDetails from './KhachHang/OrderDetails/OrderDetails';

const renderMasterRouter = () => {
    const masterRouter = [
        {
            path: ROUTERS.CUSTOMER.HOME,
            component: Customer
        },
        {
            path: ROUTERS.CUSTOMER.PROFILE,
            component: ProfileCustomer
        },
        {
            path: ROUTERS.CUSTOMER.CREATE_ORDER,
            component: CreateOrder
        },
        {
            path: ROUTERS.CUSTOMER.ORDER_LIST,
            component: OrderList
        },
        {
            path: ROUTERS.CUSTOMER.ORDER_DETAILS,
            component: OrderDetails
        }
    ];

    return (
        <MasterLayout>
            <Switch>
                {
                    masterRouter.map((item, key) => {
                        return <Route key={key} path={item.path} component={item.component} />
                    })
                }
            </Switch>
        </MasterLayout>
    );
};

const MasterRouter = () => {
    return renderMasterRouter();
};

export default memo(MasterRouter);