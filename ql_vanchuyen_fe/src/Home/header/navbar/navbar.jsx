import React from "react";
import "./navbar.style.scss";

export const Navbar = () => {
  return (
    <div>
      <div id="main-navbar" className="home-navbar">
        <h2 className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/2560px-Spring_Framework_Logo_2018.svg.png"/></h2>
        <nav>
          <ul>
            <li>
              <a href="/"><i class="fa-solid fa-house"></i> Home</a>
            </li>
            <li>
              <a href="/"><i class="fa-solid fa-address-card"></i> About</a>
            </li>
            <li>
              <a href="/"><i class="fa-solid fa-phone"></i> Contact</a>
            </li>
            <li>
              <a href="/login"><i class="fa-solid fa-user"></i> Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
