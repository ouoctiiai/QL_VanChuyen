import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import './ProfileCustomer.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { memo } from 'react';

const ProfileCustomer = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className='profile_container'>
            <div className="row profile">
                <div className="">
                    <div className="profile-content">
                        <h2>Thông tin cá nhân</h2>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Tên người dùng: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>Nguyễn Phan Như Quỳnh</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Tên đăng nhập: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>npnq</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Số điện thoại: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>0913630913</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Email: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>npnq@gmail.com</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Địa chỉ: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>140 Lê Trọng Tấn, Tây Thạnh, Tân Phú, TP.HCM</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Mật khẩu: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{showPassword ? '21122003nhuquynh ' : '***'}</p>
                            </div>
                            <div className='col-2'><i onClick={togglePasswordVisibility} className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default memo(ProfileCustomer);