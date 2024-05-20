import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import { memo } from 'react';

import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import ShipperHome from './Shipper/Pages/SP_Home';
import DSDonHang from './NhanVien/DSDonHang';
import AdminRouter from './Admin/AdminRouter';
import Team from './Admin/scenes/QLTaiKhoan';
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
import Login from './Login_Register/Login';
import Register from './Login_Register/Register';
import ListDonCho from './Shipper/Pages/ListDonCho';
import History from './Shipper/Pages/History';
import Dashboard from './Shipper/Pages/Dashboard';
import Profile from './Shipper/Pages/Profile';
import SP_Home from './Shipper/Pages/SP_Home';
import DetailOrder from './Shipper/Pages/DetailOrder';
import UpdateProfile from './Shipper/Pages/UpdateProfile';
import NV_Home from './NhanVien/NV_Home';
import DSTaiXe from './Admin/scenes/QLTaiXe';
import TaoDonHang from './NhanVien/TaoDonHang';
import ChiTietDonHang from './NhanVien/ChiTietDonHang';
import DSXe from './Admin/scenes/QLXe';
import Form from './Admin/scenes/TaoTKShipper';
import Bar from './Admin/scenes/Charts/BarChart';
import Line from './Admin/scenes/Charts/LineChart';
import Pie from './Admin/scenes/Charts/PieChart';
import Geography from './Admin/scenes/Charts/GeographyChart';

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
        },
        {
            path: ROUTERS.LOGIN.LOGIN,
            component: Login
        },
        {
            path: ROUTERS.LOGIN.REGISTER,
            component: Register
        },
        {
            path: ROUTERS.SHIPPER.HOME,
            component: SP_Home
        },
        {
            path: ROUTERS.SHIPPER.HISTORY,
            component: History
        },
        {
            path: ROUTERS.SHIPPER.DASHBOARD,
            component: Dashboard
        },
        {
            path: ROUTERS.SHIPPER.PROFILE,
            component: Profile
        },
        {
            path: ROUTERS.SHIPPER.DETAILORDER,
            component: DetailOrder
        },
        
        {
            path: ROUTERS.SHIPPER.UPDATEPEOFILE,
            component: UpdateProfile
        },

        {
            path: ROUTERS.SHIPPER.DETAILORDER,
            component: DetailOrder
        },

        {
            path: ROUTERS.ADMIN.TRANGCHUADMIN,
            component: AdminRouter
        },

        {
            path: ROUTERS.ADMIN.QLTAIKHOAN,
            component: Team
        },

        {
            path: ROUTERS.ADMIN.QLTAIXE,
            component: DSTaiXe
        },

        {
            path: ROUTERS.ADMIN.QLXE,
            component: DSXe
        },

        {
            path: ROUTERS.ADMIN.TAOTKSHIPPER,
            component: Form
        },
        {
            path: ROUTERS.ADMIN.DASHBOARD,
            component: Dashboard
        },
        {
            path: ROUTERS.ADMIN.BARCHART,
            component: Bar
          },
          {
            path: ROUTERS.ADMIN.LINECHART,
            component: Line
          },
          {
            path: ROUTERS.ADMIN.PIECHART,
            component: Pie
          },
          {
            path: ROUTERS.ADMIN.GEOGRAPHYCHART,
            component: Geography
          },
        {
            path: ROUTERS.EMPLOYEE.HOME,
            component: NV_Home
        }, 

        {
            path: ROUTERS.EMPLOYEE.LIST,
            component: DSDonHang
        },

        {
            path: ROUTERS.EMPLOYEE.CREATE,
            component: TaoDonHang
        },

        {
            path: ROUTERS.EMPLOYEE.DETAIL,
            component: ChiTietDonHang,
        }
    ];

    return (
        // <MasterLayout>
            <Switch>
                {
                    masterRouter.map((item, key) => {
                        return <Route key={key} path={item.path} component={item.component} />
                    })
                }
            </Switch>
        // </MasterLayout>
    );
};

const MasterRouter = () => {
    return renderMasterRouter();
};

export default memo(MasterRouter);