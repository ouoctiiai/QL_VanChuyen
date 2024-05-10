import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import CreateOrder from './CreateOrder/CreateOrder';
import ProfileCustomer from './Profile/ProfileCustomer';
import Menu from './Render/Menu';
import Header from './Render/Header';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderList from './OrderList/OrderList';

const CustomerLayout = ({children, ...props}) => {
    return (
        <div className='customer_container' {...props}>
            <Header />
            <div className='row'>
                <div className='col-md-2' style={{paddingLeft: '50px', paddingTop: '30px'}}>
                    <Menu />
                </div>
                <div className='col-md-10'>
                    {/* <Switch>
                        <Route path="/">
                            <CreateOrder />
                        </Route>
                        <Route path="/profile-customer">
                            <ProfileCustomer />
                        </Route>
                        <Route path="/order-details">
                            <OrderDetails />
                        </Route>
                        <Route path="/order-list">
                            <OrderList />
                        </Route>
                    </Switch> */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomerLayout;