import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
    const isAuthenticated = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("loaiTaiKhoan");

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated && userRole === requiredRole ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
