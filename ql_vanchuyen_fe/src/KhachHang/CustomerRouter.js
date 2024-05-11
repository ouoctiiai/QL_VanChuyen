import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import { memo } from 'react';
import { ROUTERS } from '../Path/router';
import Customer from './Home/Customer';
import ProfileCustomer from './Profile/ProfileCustomer';
import CreateOrder from './CreateOrder/CreateOrder';
import OrderList from './OrderList/OrderList';
import OrderDetails from './OrderDetails/OrderDetails';
import CustomerLayout from './CustomerLayout';

const renderCustomerRouter = () => {
    const customerRouter = [
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
        <BrowserRouter>
            <CustomerLayout>
                <Switch>
                    {
                        customerRouter.map((item, key) => {
                            return <Route key={key} path={item.path} component={item.component} />
                        })
                    }
                </Switch>
            </CustomerLayout>
        </BrowserRouter>
    );
};

const CustomerRouter = () => {
    return renderCustomerRouter();
};

export default memo(CustomerRouter);