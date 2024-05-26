import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom/cjs/react-router-dom';
import '../NhanVien/NV_Layout.css'

const NhanVienLayout = ({children,  ...props}) => {

    const history = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("loaiTaiKhoan");
        localStorage.removeItem("tenChuTaiKhoan");
        history.replace("/login");
        window.location.reload(true);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='d-flex wrapper nv_container' {...props}>
            <div className='bg-white sidebar-wrapper'>
                <div className='sidebar-heading text-center py-4 fs-4 fw-bold text-uppercase border-bottom nv_sidebar'>
                    <NavLink to='/nv_home' className='primary-text bg-transparent'>
                        <i className="fas fa-leaf me-2"></i>Spring
                        <br/>
                    </NavLink>
                </div>
                <div className='list-group list-group-flush my-3'>
                    <NavLink to='/dsdonhang' className='list-group-item bg-transparent second-text fw-bold dropdown-btn dbtn'>
                        <div>                       
                            <i className="fa-solid fa-list"></i> 
                                <span>&nbsp; &nbsp;</span>                        
                                Danh sách đơn hàng
                        </div>
                    </NavLink>

                    <NavLink to='/taodonhang' className='list-group-item bg-transparent second-text fw-bold dropdown-btn dbtn'>
                        <div>
                            <i className="fa-solid fa-plus"></i>
                                <span>&nbsp; &nbsp;</span>
                                Tạo đơn hàng
                        </div>
                    </NavLink>

                    <NavLink to="/login" onClick={handleLogout} className='list-group-item bg-transparent second-text fw-bold dropdown-btn dbtn'>
                        <div>
                            <i className="fa-solid fa-person-walking-arrow-right fa-flip-horizontal"></i>
                               <span>&nbsp; &nbsp;</span>
                                Đăng xuất
                        </div>
                    </NavLink>  
                </div>
            </div>

            <div className='page-content-wrapper'>
                <nav className='navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4'>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-align-left primary-text fs-4 me-3 menu-toggle'></i>
                        <h2 className='fs-2 m-0 primary-text'>Quản lý vận đơn</h2>
                    </div>

                    {/* <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className='navbar-toggler-icon'></span>
                    </button> */}

                    <div className={`collapse navbar-collapse ${dropdownOpen ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                            <li className='nav-item dropdown'>
                                <NavLink to='#' className='dropdown-toggle second-text secondary-bg fw-bold' id="navbarDropdown" onClick={toggleDropdown} data-bs-toggle="dropdown" aria-expanded={dropdownOpen ? 'true' : 'false'}> 
                                    <i className="fas fa-user me-2"></i> Bảo Ngân
                                </NavLink>
                                <ul className={`dropdown-menu dropdown-menu-right ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown" >
                                    <li><NavLink to='/' className='dropdown-item bg-white'>Profile</NavLink></li>
                                    <li><NavLink to='/' className='dropdown-item bg-white'>Settings</NavLink></li>
                                    <li><NavLink to="/login" onClick={handleLogout} className='dropdown-item'>Log out</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='container-fluid px-4'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default NhanVienLayout;