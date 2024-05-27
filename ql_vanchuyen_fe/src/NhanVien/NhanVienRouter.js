import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import { ROUTERS } from '../Path/router';
import NhanVienLayout from './NhanVienLayout';
import DSDonHang from './DSDonHang';
import TaoDonHang from './TaoDonHang';
import ChiTietDonHang from './ChiTietDonHang';


const renderNhanVienRouter = () => {
    const nhanVienRouter = [
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
            component: ChiTietDonHang
        },

    ];

    return (
        // <NhanVienLayout>   
            <Switch>
                {
                nhanVienRouter.map((item, key) => {
                    return <Route key={key} path={item.path} component={item.component} />
                })
                }
            </Switch>
            
        // </NhanVienLayout>
    );
};

const NhanVienRouter = () => {
    return renderNhanVienRouter();
};

export default NhanVienRouter;