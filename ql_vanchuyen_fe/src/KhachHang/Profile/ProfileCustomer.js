import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom';
import './ProfileCustomer.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { memo } from 'react';
import { getTaiKhoanById } from '../../Api/DataTaiKhoan';

const ProfileCustomer = () => {

    const [taiKhoan, setTaiKhoan] = useState([]);
    const [thongTinTaiKhoan, setThongTinTaiKhoan] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        try {
            const id = localStorage.getItem("userId");
            getTaiKhoanById(id).then((Response) => {
                setTaiKhoan(Response.data);
                setThongTinTaiKhoan(Response.data.thongTinTaiKhoan);
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);



    return (
        <div className='profile_container'>
            <div className="row profile">
                <div>
                    <div className="profile-content">
                        <h2>Thông tin cá nhân</h2>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Tên người dùng: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{taiKhoan.tenChuTaiKhoan}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Tên đăng nhập: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{taiKhoan.tenTaiKhoan}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Số điện thoại: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{taiKhoan.sdt}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Email: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{taiKhoan.email}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>CMND/CCCD: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{taiKhoan.soCCCD || 'Không'}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Địa chỉ: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{taiKhoan.diaChi}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Mật khẩu: </p>
                            </div>
                            <div className='col-4'>
                                <p className='content'>{showPassword ? `${taiKhoan.matKhau}` : '***'}</p>
                            </div>
                            <div className='col-2'><i onClick={togglePasswordVisibility} className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Ngân hàng: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{thongTinTaiKhoan.tenNganHang}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <p className='title fw-bold'>Số tài khoản: </p>
                            </div>
                            <div className='col-6'>
                                <p className='content'>{thongTinTaiKhoan.soTaiKhoan}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default memo(ProfileCustomer);