import React, { useState } from "react";

import "../Styles/Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
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
          <NavLink to="/shipper_home/history">History</NavLink>
        </li>
        <li>
          <NavLink to="/shipper_home/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/shipper_home/profile">ProFile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
