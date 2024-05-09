import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import CreateOrder from './CreateOrder/CreateOrder';
import ProfileCustomer from './Profile/ProfileCustomer';
import Menu from './Render/Menu';
import Header from './Render/Header';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderList from './OrderList/OrderList';

const CustomerRouter = () => {
    return (
        <div className='customer_container'>
            <Header />
            <div className='row'>
                <div className='col-md-3' style={{paddingLeft: '50px'}}>
                    <Menu />
                </div>
                <div className='col-md-9'>
                    <Switch>
                        <Route path="/" component={<CreateOrder />}/>
                            {/* <CreateOrder />
                        </Route> */}
                        <Route path="/profile-customer" element={<ProfileCustomer />}/>
                            {/* <ProfileCustomer /> */}
                        {/* </Route> */}
                        <Route path="/order-details">
                            <OrderDetails />
                        </Route>
                        <Route path="/order-list">
                            <OrderList />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default CustomerRouter;