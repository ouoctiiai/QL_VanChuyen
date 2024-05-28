import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import './Login_Regis.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { create } from '@mui/material/styles/createTransitions';
import { createAccountCustomer, getDSKhachHang, listTaiKhoan } from '../Api/DataTaiKhoan';


const Register = (props) => {

    // const [value, setValue] = useState('');
    // const [isActive, setIsActive] = useState('');
    const [isChecked, setIsChecked] = useState('');
    const [formState, setFormState] = useState({
        namelogin: '', fullname: '', phone: '', email: '', password: '', repassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const [isActiveNameLogin, setIsActiveNameLogin] = useState(false);
    const [isActiveFullName, setIsActiveFullName] = useState(false);
    const [isActivePhone, setIsActivePhone] = useState(false);
    const [isActiveEmail, setIsActiveEmail] = useState(false);
    const [isActivePassword, setIsActivePassword] = useState(false);
    const [isActiveRePassword, setIsActiveRePassword] = useState(false);

    const history = useHistory();

    const handleChange = (event) => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        setIsActiveNameLogin(!!formState.namelogin);
        setIsActiveFullName(!!formState.fullname);
        setIsActivePhone(!!formState.phone);
        setIsActiveEmail(!!formState.email);
        setIsActivePassword(!!formState.password);
        setIsActiveRePassword(!!formState.repassword);
    }, [formState.namelogin, formState.fullname, formState.phone, formState.email, formState.password, formState.repassword]);


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const checkIfAccountExists = async () => {
        try {
            const response = await getDSKhachHang();
            const accounts = response.data;

            const usernameExists = accounts.some(account => account.tenTaiKhoan === formState.namelogin);
            const phoneExists = accounts.some(account => account.sdt === formState.phone);

            if (usernameExists) {
                setErrorMessage('Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác.');
                return true;
            }
            if (phoneExists) {
                setErrorMessage('Số điện thoại đã được sử dụng. Vui lòng sử dụng số điện thoại khác.');
                return true;
            }
            return false;
        } catch (error) {
            console.error("Có lỗi xảy ra khi kiểm tra tài khoản: ", error);
            setErrorMessage('Có lỗi xảy ra khi kiểm tra tài khoản. Vui lòng thử lại sau.');
            return true;
        }
    }

    const handleSignIn = async(event) => {
        event.preventDefault();

        const accountExists = await checkIfAccountExists();
        if (accountExists) {
            return;
        }

        const taiKhoanMoi = {
            loaiTaiKhoan: "Khách hàng",
            tenTaiKhoan: formState.namelogin,
            tenChuTaiKhoan: formState.fullname,
            sdt: formState.phone,
            email: formState.email,
            matKhau: formState.password
        };
        console.log(taiKhoanMoi);

        if (!isChecked) {
            setErrorMessage('Vui lòng đánh dấu vào ô "Tôi đã đọc và đồng ý với các điều khoản" trước khi đăng nhập.');
            return;
        } else if (formState.password !== formState.repassword) {
            setErrorMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        } else {
            createAccountCustomer(taiKhoanMoi).then(Response => {
                alert("Tạo tài khoản thành công!");
            }).catch(error => {
                console.error("Có lỗi xảy ra: ", error);
                alert("Tạo tài khoản thất bại!");
            });
            history.push('/login');
            setErrorMessage('');
        }

    };



    return (
        <div className='login_container'>
            {/* <!-- Pills navs --> */}
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" exact id="tab-login" data-mdb-pill-init to="/login" role="tab"
                        aria-controls="pills-login" aria-selected="true">Đăng Nhập</NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" id="tab-register" data-mdb-pill-init to="/register" role="tab"
                        aria-controls="pills-register" aria-selected="false">Đăng ký</NavLink>
                </li>
            </ul>
            {/* <!-- Pills navs -->

            <!-- Pills content --> */}
            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form onSubmit={handleSignIn}>
                        {/* <!-- Name input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="text" id="registerNameLogin" name='namelogin' value={formState.namelogin} onChange={handleChange} className={`form-control ${isActiveNameLogin ? 'active' : ''}`} />
                            <label className="form-label" for="registerNameLogin">Tên đăng nhập</label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="text" id="registerFullName" name='fullname' value={formState.fullname} onChange={handleChange} className={`form-control ${isActiveFullName ? 'active' : ''}`} />
                            <label className="form-label" for="registerFullName">Họ và tên</label>
                        </div>

                        {/* <!-- Phone Number input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="text" id="registerPhone" name='phone' value={formState.phone} onChange={handleChange} className={`form-control ${isActivePhone ? 'active' : ''}`} />
                            <label className="form-label" for="registerPhone">Số điện thoại</label>
                        </div>

                        {/* <!-- Email input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="email" id="registerEmail" name='email' value={formState.email} onChange={handleChange} className={`form-control ${isActiveEmail ? 'active' : ''}`} />
                            <label className="form-label" for="registerEmail">Email</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="password" id="registerPassword" name='password' value={formState.password} onChange={handleChange} className={`form-control ${isActivePassword ? 'active' : ''}`} />
                            <label className="form-label" for="registerPassword">Mật khẩu</label>
                        </div>

                        {/* <!-- Repeat Password input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="password" id="registerRepeatPassword" name='repassword' value={formState.repassword} onChange={handleChange} className={`form-control ${isActiveRePassword ? 'active' : ''}`} />
                            <label className="form-label" for="registerRepeatPassword">Nhập lại mật khẩu</label>
                        </div>

                        {/* <!-- Checkbox --> */}
                        <div className="form-check d-flex justify-content-center mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" onChange={handleCheckboxChange}
                                aria-describedby="registerCheckHelpText" />
                            {isChecked}
                            <label className="form-check-label" for="registerCheck">
                                Tôi đã đọc và đồng ý với các điều khoản
                            </label>
                        </div>

                        <div className='d-flex justify-content-center'>
                            {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-3" onClick={handleSignIn}>Đăng ký</button>

                    </form>
                </div>
            </div>
            {/* <!-- Pills content --> */}
        </div>
    );
}

export default Register;