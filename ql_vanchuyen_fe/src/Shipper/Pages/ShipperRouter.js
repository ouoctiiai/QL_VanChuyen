import React from 'react'
import Navbar from '../Components/Navbar';
import History from "./History";
import Profile  from "./Profile";
import ListDonCho  from "./ListDonCho";
import Dashboard  from "./Dashboard";
import UpdateProfile from './UpdateProfile';
import DetailOrder from './DetailOrder';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import { memo } from 'react';
import DetailHistory from './DetailHistory';
import Delivery from './Delivery';
import OrderAtWH from './OrderAtWH';
import { ROUTERS } from '../../Path/router';

const renderShipperRouter = () => {
    const shipperRouter = [
        {
            path: "/",
            component: ListDonCho,
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
    ];

    return (
        
                <Switch>
                    {
                        shipperRouter.map((item, key) => {
                            return <Route key={key} path={item.path} component={item.component} />
                        })
                    }
                </Switch>
    );
};

const ShipperRouter = () => {
    return renderShipperRouter();
};

export default memo(ShipperRouter);