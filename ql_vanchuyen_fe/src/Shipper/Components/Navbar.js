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
  }
  return (
    <div {...props}>
      <nav className="navShip">
        <Link to="/shipper_home" className="title">
          Don cho
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/history">History</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/profile">ProFile</NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={handleLogout}>
              <i class="fa-solid fa-person-walking-arrow-right"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}

export default Navbar
