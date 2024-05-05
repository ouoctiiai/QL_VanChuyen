import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import './ProfileCustomer.scss';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function ProfileCustomer(props) {
    return (
        <div className='profile_container'>
            <div className="row profile">
                <div className="col-md-3">
                    <div className="profile-sidebar">
                        {/* <!-- SIDEBAR USERPIC --> */}
                        <div className="profile-userpic">
                            <img src="https://i.pinimg.com/564x/70/e4/cd/70e4cdf616495a4783ceb2259af71f87.jpg" className="img-responsive" alt="" />
                        </div>
                        {/* <!-- END SIDEBAR USERPIC -->
                        <!-- SIDEBAR USER TITLE --> */}
                        <div className="profile-usertitle">
                            <div className="profile-usertitle-name">
                                Tên tài khoản
                            </div>
                            <div className="profile-usertitle-job">
                                Role
                            </div>
                        </div>
                        {/* <!-- END SIDEBAR USER TITLE -->
                        <!-- SIDEBAR BUTTONS --> */}
                        <div className="profile-userbuttons">
                            <button type="button" className="btn btn-success btn-sm">Follow</button>
                            <button type="button" className="btn btn-danger btn-sm">Message</button>
                        </div>
                        {/* <!-- END SIDEBAR BUTTONS -->
                        <!-- SIDEBAR MENU --> */}
                        <div className="profile-usermenu">
                            <ul className="menu">
                                <li className="active">
                                    <NavLink to="#">
                                        <i class="fa-solid fa-house"></i>
                                        Overview </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i class="fa-solid fa-user"></i>
                                        Account Settings </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#" target="_blank">
                                        <i class="fa-solid fa-check"></i>
                                        Tasks </NavLink>
                                </li>
                                <li>
                                    <NavLink to="#">
                                        <i class="fa-solid fa-question"></i>
                                        Help </NavLink>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- END MENU --> */}
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="profile-content">
                        Some user related content goes here...
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCustomer;