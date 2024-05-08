import React from 'react';
import { Link, NavLink, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom';
// import Nav from './../Navigation/Nav';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Customer.scss';
import OrderDetails from '../OrderDetails/OrderDetails';
import CreateOrder from '../CreateOrder/CreateOrder';
import { memo } from 'react';


const Customer = () => {

    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        history.replace("/login");
    }

    return (
        <div>
            Home Customer
            <button onClick={handleLogout}>Logout</button>
            <Link to="/create-order">
                <button >Create Order</button>
            </Link>
            <Link to="/order-details">
                <button >Order Details</button>
            </Link>
        </div>
    );
}

export default memo(Customer);