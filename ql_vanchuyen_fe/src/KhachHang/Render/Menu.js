import React from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';

const Menu = () => {

    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("loaiTaiKhoan");
        localStorage.removeItem("tenChuTaiKhoan");
        history.replace("/login");
        window.location.reload(true);
    }
    const tenChuTaiKhoan = localStorage.getItem("tenChuTaiKhoan");
    const loaiTaiKhoan = localStorage.getItem("loaiTaiKhoan");


    return (
        <div className='menu_container'>
            <div className="profile-userpic">
                <img src="https://i.pinimg.com/564x/70/e4/cd/70e4cdf616495a4783ceb2259af71f87.jpg" className="img-responsive" alt="" />
            </div>
            {/* <!-- END SIDEBAR USERPIC -->
                        <!-- SIDEBAR USER TITLE --> */}
            <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                    {tenChuTaiKhoan}
                </div>
                <div className="profile-usertitle-job">
                    {loaiTaiKhoan}
                </div>
            </div>
            <div className="profile-usermenu">
                <ul className="menu">
                    <li>
                        <NavLink to="/create-order">
                            <div>
                                <i class="fa-solid fa-plus"></i>
                                Tạo đơn hàng
                            </div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/order-list">
                            <div>
                                <i class="fa-solid fa-list"></i>
                                Danh sách đơn hàng
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile-customer">
                            <div>
                                <i class="fa-solid fa-user"></i>
                                Thông tin cá nhân
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" onClick={handleLogout}>
                            <div>
                                <i class="fa-solid fa-person-walking-arrow-right fa-flip-horizontal"></i>
                                Đăng xuất
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default Menu;