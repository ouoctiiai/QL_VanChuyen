import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import CreateOrder from './CreateOrder/CreateOrder';
import OrderDetails from './OrderDetails/OrderDetails';
import { ROUTERS } from '../Path/Router';
import ProfileCustomer from './Profile/ProfileCustomer';
import Customer from './Home/Customer';
import OrderList from './OrderList/OrderList';
import { memo } from 'react';
import MasterLayout from './Render/MasterLayout';

const renderCustomerRouter = () => {
    const customerRouter = [
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
            component: <CreateOrder />
        },
        {
            path: ROUTERS.CUSTOMER.ORDER_LIST,
            component: <OrderList />
        },
        {
            path: ROUTERS.CUSTOMER.ORDER_DETAILS,
            component: <OrderDetails />
        }
    ];

    return (
        <MasterLayout>
            <Switch>
                {
                    customerRouter.map((item, key) => {
                        return <Route key={key} path={item.path} component={item.component} />
                    })
                }
            </Switch>
        </MasterLayout>
    );
};

const CustomerRouter = () => {
    return renderCustomerRouter();
};

export default memo(CustomerRouter);