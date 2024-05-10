import React from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';

const Menu = () => {

    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        history.replace("/login");
    }
    return (
        <div className="profile-usermenu">
            <ul className="menu">
                <li>
                    <NavLink to="/customer">
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
                    <NavLink to="/login">
                        <div>
                            <i class="fa-solid fa-person-walking-arrow-right fa-flip-horizontal"></i>
                            Đăng xuất
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Menu;