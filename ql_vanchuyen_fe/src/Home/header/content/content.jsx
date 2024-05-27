import React from "react";
import "./container.style.css";
import { Button, NavLink } from "react-bootstrap";
import { tokens } from './../../../Admin/theme';
import { useHistory } from 'react-router-dom';
export const Content = () => {

  const history = useHistory();

  const handleButton = () => {
    history.push("/login");
    window.location.reload();
  }

  return (
    <div>
      <div className="home-container">
        {/* <h2>ALL NEW EVERYTHING</h2> */}
        <h1>WELCOME TO <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/2560px-Spring_Framework_Logo_2018.svg.png" /></h1>
        <p>Nguyễn Quốc Thái - Nguyễn Phương Bảo Ngân - Nguyễn Phan Như Quỳnh - Bùi Phan Bảo Ngọc</p>
        {/* <p className="button">Explore</p> */}
        <div>
            <Button className="btn-create" style={{ color: "white", width: "200px", height: "55px", fontSize: "24px" }} onClick={handleButton}>Login</Button>
        </div>
      </div>
    </div>
  );
};
