import React from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
// import Nav from './../Navigation/Nav';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Customer.scss';


function Customer(props) {

    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        history.replace("/login");
    }
    
    return(
        <div>
            Home Customer
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Customer;