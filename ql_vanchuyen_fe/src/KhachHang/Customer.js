import React from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
// import Nav from './../Navigation/Nav';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Customer.scss';


function Customer(props) {

    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        history.replace("/login");
    }
    return (
        <div className='custom_container'>
            {/* <Nav /> */}
            <div className='title'>
                
                <h3 className='fw-bold'><i class="fa-solid fa-list"></i> Danh sách đơn hàng</h3>
            </div>
            <table className="table">
                <thead>
                    <tr className='table-info font-style'>
                        <th scope="col">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <th scope="col">STT</th>
                        <th scope="col">Mã đơn hàng</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Ngày tạo đơn</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>1</td>
                        <td>DH001</td>
                        <td>jksghbsikbvỉe</td>
                        <td>5/5/2024</td>
                        <td>Đang giao hàng</td>
                        <td><NavLink to='/order-details'><i class="fa-solid fa-circle-info"></i></NavLink></td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Adipisicing</td>
                        <td>Elit</td>
                        <td>Sint</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Hic</td>
                        <td>Fugiat</td>
                        <td>Temporibus</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Customer;