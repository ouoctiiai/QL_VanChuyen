import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import './ProfileCustomer.scss';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function ProfileCustomer(props) {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


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
                        <h2>Thông tin cá nhân</h2>
                        <div className='row'>
                            <p className='title fw-bold col-4'>Tên đầy đủ: </p>
                            <p className='content col-6'>Nguyễn Phan Như Quỳnh</p>
                        </div>
                        <div className='row'>
                            <p className='title fw-bold col-4'>Tên đăng nhập: </p>
                            <p className='content col-6'>npnq</p>
                        </div>
                        <div className='row'>
                            <p className='title fw-bold col-4'>Số điện thoại: </p>
                            <p className='content col-6'>0913630913</p>
                        </div>
                        <div className='row'>
                            <p className='title fw-bold col-4'>Email: </p>
                            <p className='content col-6'>npnq.anime@gmail.com</p>
                        </div>
                        <div className='row'>
                            <p className='title fw-bold col-4'>Địa chỉ: </p>
                            <p className='content col-6'>140 Lê Trọng Tấn, Tây Thạnh, Tân Phú, TP.HCM</p>
                        </div>
                        <div className='row'>
                            <p className='title fw-bold col-4'>Mật khẩu: </p>
                            <p className='content col-6'>
                                {showPassword ? '21122003nhuquynh ' : '***'}
                                </p>
                                <i onClick={togglePasswordVisibility} className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} col-2`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCustomer;