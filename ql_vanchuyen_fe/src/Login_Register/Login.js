import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import './Login_Regis.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { login } from '../Api/DataTaiKhoan';
import axios from 'axios';




const Login = (props) => {
    // const [value, setValue] = useState('');
    // const [isActive, setIsActive] = useState('');
    const [isChecked, setIsChecked] = useState('');
    const [formState, setFormState] = useState({
        tenTaiKhoan: '', password: ''
    });
    const [isActiveUsername, setIsActiveUsername] = useState(false);
    const [isActivePassword, setIsActivePassword] = useState(false);
    const history = useHistory();

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
        console.log('Form state:', formState);

        try {
            const response = await login({
                tenTaiKhoan: formState.tenTaiKhoan,
                matKhau: formState.password
            });

            console.log('Response:', response);

            if (response.status === 200) {
                const data = response.data;
                const { id, loaiTaiKhoan, tenChuTaiKhoan } = data;

                if (loaiTaiKhoan === 'Khách hàng') {
                    localStorage.setItem("userId", id);
                    localStorage.setItem("tenChuTaiKhoan", tenChuTaiKhoan);
                    localStorage.setItem("loaiTaiKhoan", loaiTaiKhoan);
                    localStorage.setItem("accessToken", true);
                    history.replace(`/customer/${id}`);
                } else if (loaiTaiKhoan === 'Shipper') {
                    localStorage.setItem("userId", id);
                    localStorage.setItem("accessToken", true)
                    history.setItem(`/shipper_home/${id}`);
                } else {
                    // Handle other user types or show an error message
                    alert('Login successful but not a customer.');
                }
            } else {
                console.error('Login failed with status:', response.status);
                alert('Login failed. Please check your username and password.');
            }

            if (isChecked) {
                localStorage.setItem("loginData", JSON.stringify(formState));
            } else {
                localStorage.removeItem("loginData");
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Error during login (response data):', error.response.data);
                console.error('Error during login (response status):', error.response.status);
                console.error('Error during login (response headers):', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error during login (request):', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error during login (message):', error.message);
            }
            alert('An error occurred during login. Please try again later.');
        }
    }


    return (
        <div className='login_container' >
            {/* <!-- Pills navs --> */}
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
            {/* <!-- Pills navs -->

            <!-- Pills content --> */}
            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">

                    <form>
                        {/* <div className="text-center mb-3">
                            <p>Đăng nhập với:</p>
                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div> */}

                        {/* <p className="text-center">hoặc:</p> */}

                        {/* <!-- Email input --> */}
                        <div data-mdb-input-init className='form-outline mb-4'>
                            <input type="text" id="loginName" name='tenTaiKhoan' value={formState.tenTaiKhoan} onChange={handleChange} className={`form-control ${isActiveUsername ? 'active' : ''}`} />
                            <label className="form-label" htmlFor="loginName">Tên Đăng Nhập</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="password" id="loginPassword" name='password' value={formState.password} onChange={handleChange} className={`form-control ${isActivePassword ? 'active' : ''}`} />
                            <label className="form-label" htmlFor="loginPassword">Mật khẩu</label>
                        </div>

                        {/* <!-- 2 column grid layout --> */}
                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center">
                                {/* <!-- Checkbox --> */}
                                <div className="form-check mb-3 mb-md-0">
                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" onChange={handleCheckboxChange} />
                                    {isChecked}
                                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex justify-content-center">
                                {/* <!-- Simple link --> */}
                                <NavLink to="/#!">Quên mật khẩu?</NavLink>
                            </div>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="submit" onClick={handleSignIn} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Đăng nhập</button>

                        {/* <!-- Register buttons --> */}
                        <div className="text-center">
                            <p>Chưa có tài khoản? <NavLink to="/register">Đăng Ký</NavLink></p>
                        </div>
                    </form>
                </div>
            </div>
            {/* <!-- Pills content --> */}
        </div>
    );
}

export default Login;