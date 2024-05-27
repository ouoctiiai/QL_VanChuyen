import React, { Component, useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import { memo } from 'react';

import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import ShipperHome from './Shipper/Pages/SP_Home';
import DSDonHang from './NhanVien/DSDonHang';
import AdminRouter from './Admin/AdminRouter';
import Team from './Admin/scenes/QLTaiKhoan';
import "./Admin/index.css";
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
import UpdateProfileCustomer from './KhachHang/Profile/UpdateProfileCustomer';
import UpdatePasswordCustomer from './KhachHang/Profile/UpdatePasswordCustomer';
import PhieuChi from './Admin/scenes/TaoPhieuChi';
import DetailHistory from './Shipper/Pages/DetailHistory';
import Delivery from './Shipper/Pages/Delivery';
import OrderAtWH from './Shipper/Pages/OrderAtWH';
import DSPhieuChi from './Admin/scenes/QLPhieuChi';
import TrangChu from './Home/TrangChu';
import Radar from './Admin/scenes/Charts/Radar';
import history from './history';
import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/scenes/dashboard';
import CustomerLayout from './KhachHang/CustomerLayout';
import NhanVienLayout from './NhanVien/NhanVienLayout';
import Navbar from './Shipper/Components/Navbar';

const renderMasterRouter = (role) => {
    const masterRouter = {
        customer: [
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
                path: ROUTERS.CUSTOMER.UPDATE_PASSWORD,
                component: UpdatePasswordCustomer,
                isPrivate: true
            }
        ],
        shipper: [
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
                path: ROUTERS.SHIPPER.DELIVERY,
                component: Delivery,
                isPrivate: true
            },

            {
                path: ROUTERS.SHIPPER.ORDERATWH,
                component: OrderAtWH,
                isPrivate: true
            },
            {
                path: ROUTERS.SHIPPER.LISTDONCHO,
                component: ListDonCho,
                isPrivate: true
            }
        ],
        admin: [
            {
                path: ROUTERS.ADMIN.QLTAIKHOAN,
                component: Team,
                isPrivate: true
            },

            {
                path: ROUTERS.ADMIN.TRANGCHUADMIN,
                component: AdminDashboard,
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
            // {
            //     path: ROUTERS.ADMIN.DASHBOARD,
            //     component: AdminDashboard,
            //     isPrivate: true
            // },
            {
                path: ROUTERS.ADMIN.RADARCHART,
                component: Radar,
                isPrivate: true
            },
            {
                path: ROUTERS.ADMIN.BARCHART,
                component: Bar,
                isPrivate: true
            },
            {
                path: ROUTERS.ADMIN.LINECHART,
                component: Line,
                isPrivate: true
            },
            {
                path: ROUTERS.ADMIN.PIECHART,
                component: Pie,
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
                path: ROUTERS.ADMIN.QLPHIEUCHI,
                component: DSPhieuChi,
                isPrivate: true
            },
        ],
        employee: [
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
                path: ROUTERS.EMPLOYEE.HOME,
                component: NV_Home,
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
        ],
        public: [
            {
                path: ROUTERS.LOGIN.LOGIN,
                component: Login,
            },
            {
                path: ROUTERS.LOGIN.REGISTER,
                component: Register,
            },
            {
                path: ROUTERS.HOME.HOME,
                component: TrangChu
            }
        ]
    };

    const createRouters = (masterRouter, isPrivate = false, role = null) => {
        console.log('masterRouter', masterRouter);
        return masterRouter.map((item, key) => {
            if (item.isPrivate) {
                return (
                    <PrivateRoute
                        history={history}
                        key={item.path}
                        path={item.path}
                        component={item.component}
                        requiredRole={role}
                    />
                );
            } else {
                return (
                    <Route
                        history={history}
                        key={item.path}
                        path={item.path}
                        component={item.component}
                    />
                );
            }
        })
    }

    return (
        <Switch>
            {role === 'QuanLy' && <AdminLayout>
                {createRouters(masterRouter.admin, true, "QuanLy")}
            </AdminLayout>}
            {role === 'Khách hàng' && <CustomerLayout>
                {createRouters(masterRouter.customer, true, "Khách hàng")}
            </CustomerLayout>}
            {role === 'Shipper' && <Navbar>
                {createRouters(masterRouter.shipper, true, "Shipper")}
            </Navbar>}
            {role === 'Kho' && <NhanVienLayout>
                {createRouters(masterRouter.shipper, true, "Kho")}
            </NhanVienLayout>}
            {createRouters(masterRouter.public)}
            {/* {createRouters(masterRouter.customer, true, "Khách hàng")}
            {createRouters(masterRouter.shipper, true, "Shipper")}
            {createRouters(masterRouter.admin, true, "QuanLy")}
            {createRouters(masterRouter.employee, true, "Kho")}
            {createRouters(masterRouter.public)} */}
        </Switch >
    );
};

const MasterRouter = () => {
    const userRole = localStorage.getItem('loaiTaiKhoan')
    return renderMasterRouter(userRole);
};

export default memo(MasterRouter);