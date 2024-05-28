import React, { useState } from "react";

import "../Styles/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Navbar = ({ children, ...props }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("loaiTaiKhoan");
    localStorage.removeItem("tenChuTaiKhoan");
    history.replace("/login");
    window.location.reload(true);
  };

  return (
    <div {...props} className="navbar-containerSP" style={{overflowX: 'hidden'}}> 
      <nav className="navShip">
        <Link to="/shipper_home" className="title">
          Đơn chờ giao
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/orderAtWH">Nhận đơn tại kho</NavLink>
          </li>
          <li>
            <NavLink to="/history">History</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={handleLogout}>
              <i className="fa-solid fa-person-walking-arrow-right"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="content-container" style={{overflowX: 'hidden'}}>{children}</div>
    </div>
  );
};

export default Navbar;
