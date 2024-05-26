import React, { useState } from 'react';
import './Header.scss'
import { useHistory } from 'react-router-dom';


const Header = () => {
    const history = useHistory();

    const handleButtonHome = () => {
        history.push("/");
        window.location.reload(true);
    }
    return (
        <div className='header_container'>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand">Logo</a>
                    <div class="d-flex">
                        <button class="btn-header mx-3" type="submit" onClick={handleButtonHome}>Home</button>
                        <button class="btn-header mx-3" type="submit">News</button>
                        <button class="btn-header mx-3" type="submit">About us</button>
                        <button class="btn-header mx-3" type="submit">Contact us</button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;