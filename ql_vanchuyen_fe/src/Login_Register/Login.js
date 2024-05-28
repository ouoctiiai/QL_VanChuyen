import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Login_Regis.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { listTaiKhoan, login } from '../Api/DataTaiKhoan';
import axios from 'axios';
import { WindowSharp } from '@mui/icons-material';

const Login = (props) => {
    const [isChecked, setIsChecked] = useState('');
    const [formState, setFormState] = useState({
        tenTaiKhoan: '', password: ''
    });
    const [isActiveUsername, setIsActiveUsername] = useState(false);
    const [isActivePassword, setIsActivePassword] = useState(false);
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');

    
    const handleChange = (event) => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        setIsActiveUsername(!!formState.tenTaiKhoan);
        setIsActivePassword(!!formState.password);

        const rememberMe = localStorage.getItem("rememberMe") === "true";
        setIsChecked(rememberMe);
    }, [formState.tenTaiKhoan, formState.password]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        localStorage.setItem("rememberMe", !isChecked);
    }

    const handleSignIn = async (event) => {
        event.preventDefault();
        // console.log('Form state:', formState);

        try {
            const response = await login({
                tenTaiKhoan: formState.tenTaiKhoan,
                matKhau: formState.password
            });

            // console.log('Response:', response);

            if (response.status === 200) {
                const data = response.data;
                const { id, loaiTaiKhoan, tenChuTaiKhoan } = data;

                let redirectPath = '';

                localStorage.setItem("userId", id);
                localStorage.setItem("loaiTaiKhoan", loaiTaiKhoan);
                localStorage.setItem("accessToken", true)

                if (loaiTaiKhoan === 'Khách hàng') {
                    localStorage.setItem("tenChuTaiKhoan", tenChuTaiKhoan);
                    
                    redirectPath = `/customer/${id}`;
                } else if (loaiTaiKhoan === 'Shipper') {
                    redirectPath = `/shipper_home/${id}`;
                } else if(loaiTaiKhoan === "Kho"){
                    redirectPath = `/nv_home/${id}`;
                } else if(loaiTaiKhoan === "QuanLy"){
                    redirectPath = `/trangchuadmin/${id}`;
                } else {
                    alert('Login failed!');
                }

                if (isChecked) {
                    localStorage.setItem("loginData", JSON.stringify(formState));
                } else {
                    localStorage.removeItem("loginData");
                }
                history.push(redirectPath);
                window.location.reload();
                
            } else {
                console.error('Login failed with status:', response.status);
                alert('Login failed. Please check your username and password.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error during login (response data):', error.response.data);
                console.error('Error during login (response status):', error.response.status);
                console.error('Error during login (response headers):', error.response.headers);
            } else if (error.request) {
                console.error('Error during login (request):', error.request);
            } else {
                console.error('Error during login (message):', error.message);
            }
            alert('Tài khoản không tồn tại! Hãy đăng ký tài khoản để đăng nhập!');
        }
    }


    return (
        <div className='login_container'>
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <NavLink className="nav-link active" id="tab-login" data-mdb-pill-init to="/login" role="tab"
                        aria-controls="pills-login" aria-selected="true">Đăng nhập</NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" id="tab-register" data-mdb-pill-init to="/register" role="tab"
                        aria-controls="pills-register" aria-selected="false">Đăng ký</NavLink>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form>
                        <div data-mdb-input-init className='form-outline mb-4'>
                            <input type="text" id="loginName" name='tenTaiKhoan' value={formState.tenTaiKhoan} onChange={handleChange} className={`form-control ${isActiveUsername ? 'active' : ''}`} />
                            <label className="form-label" htmlFor="loginName">Tên Đăng Nhập</label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="password" id="loginPassword" name='password' value={formState.password} onChange={handleChange} className={`form-control ${isActivePassword ? 'active' : ''}`} />
                            <label className="form-label" htmlFor="loginPassword">Mật khẩu</label>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center">
                                <div className="form-check mb-3 mb-md-0">
                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" onChange={handleCheckboxChange} />
                                    {isChecked}
                                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex justify-content-center">
                                <NavLink to="/#!">Quên mật khẩu?</NavLink>
                            </div>
                        </div>

                        <button type="submit" onClick={handleSignIn} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Đăng nhập</button>

                        <div className="text-center">
                            <p>Chưa có tài khoản? <NavLink to="/register">Đăng Ký</NavLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
