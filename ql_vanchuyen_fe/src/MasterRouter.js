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
import PrivateRoute from './Path/PrivateRouter';
import Bar from './Admin/scenes/Charts/BarChart';
import Line from './Admin/scenes/Charts/LineChart';
import Pie from './Admin/scenes/Charts/PieChart';
import PhieuChi from './Admin/scenes/TaoPhieuChi';

import UpdateProfileCustomer from './KhachHang/Profile/UpdateProfileCustomer';
import DetailHistory from './Shipper/Pages/DetailHistory';

const renderMasterRouter = () => {
    const masterRouter = [
        {
            path: ROUTERS.CUSTOMER.HOME,
            component: Customer,
            isPrivate: true
        },
        {
            path: ROUTERS.CUSTOMER.PROFILE,
            component: ProfileCustomer,
            isPrivate: true
        },
        {
            path: ROUTERS.CUSTOMER.CREATE_ORDER,
            component: CreateOrder,
            isPrivate: true
        },
        {
            path: ROUTERS.CUSTOMER.ORDER_LIST,
            component: OrderList,
            isPrivate: true
        },
        {
            path: ROUTERS.CUSTOMER.ORDER_DETAILS,
            component: OrderDetails,
            isPrivate: true
        },
        {
            path: ROUTERS.CUSTOMER.UPDATE_PROFILE,
            component: UpdateProfileCustomer,
            isPrivate: true
        },
        {
            path: ROUTERS.LOGIN.LOGIN,
            component: Login,
        },
        {
            path: ROUTERS.LOGIN.REGISTER,
            component: Register,
        },
        {
            path: ROUTERS.SHIPPER.HOME,
            component: SP_Home,
            isPrivate: true
        },
        {
            path: ROUTERS.SHIPPER.HISTORY,
            component: History,
            isPrivate: true
        },
        {
            path: ROUTERS.SHIPPER.DASHBOARD,
            component: Dashboard,
            isPrivate: true
        },
        {
            path: ROUTERS.SHIPPER.PROFILE,
            component: Profile,
            isPrivate: true
        },
        {
            path: ROUTERS.SHIPPER.DETAILORDER,
            component: DetailOrder,
            isPrivate: true
        },

        {
            path: ROUTERS.SHIPPER.UPDATEPEOFILE,
            component: UpdateProfile,
            isPrivate: true
        },

        {
            path: ROUTERS.SHIPPER.DETAILORDER,
            component: DetailOrder,
            isPrivate: true
        },

        {
            path: ROUTERS.SHIPPER.DETAILHISTORY,
            component: DetailHistory,
            isPrivate: true
        },

        {
            path: ROUTERS.ADMIN.TRANGCHUADMIN,
            component: AdminRouter,
            isPrivate: true
        },

        {
            path: ROUTERS.ADMIN.QLTAIKHOAN,
            component: Team,
            isPrivate: true
        },

        {
            path: ROUTERS.ADMIN.QLTAIXE,
            component: DSTaiXe,
            isPrivate: true
        },

        {
            path: ROUTERS.ADMIN.QLXE,
            component: DSXe,
            isPrivate: true
        },

        {
            path: ROUTERS.ADMIN.TAOTKSHIPPER,
            component: Form,
            isPrivate: true
        },
        {
            path: ROUTERS.ADMIN.TAOPHIEUCHI,
            component: PhieuChi,
            isPrivate: true
        },
        {
            path: ROUTERS.ADMIN.DASHBOARD,
            component: Dashboard,
            isPrivate: true
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
            path: ROUTERS.EMPLOYEE.HOME,
            component: NV_Home,
            isPrivate: true
        },

        {
            path: ROUTERS.EMPLOYEE.LIST,
            component: DSDonHang,
            isPrivate: true
        },

        {
            path: ROUTERS.EMPLOYEE.CREATE,
            component: TaoDonHang,
            isPrivate: true
        },

        {
            path: ROUTERS.EMPLOYEE.DETAIL,
            component: ChiTietDonHang,
            isPrivate: true
        }
    ];

    return (
        <Switch>
            {
                masterRouter.map((item, key) => {
                    if (item.isPrivate) {
                        return (
                            <PrivateRoute 
                                key={key} 
                                path={item.path} 
                                component={item.component} 
                            />
                        );
                    } else {
                        return (
                            <Route 
                                key={key} 
                                path={item.path} 
                                component={item.component} 
                            />
                        );
                    }
                })
            }
        </Switch>
    );
};

const MasterRouter = () => {
    return renderMasterRouter();
};

export default memo(MasterRouter);