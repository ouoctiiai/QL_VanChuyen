import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
// import Nav from './../Navigation/Nav';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


function TrangKhachHang(props) {

    const history = useHistory();
    const handleLogout = () =>{
        localStorage.removeItem("accessToken");
        history.replace("/login");
    }
    return (
        <div className='custom_container'>
            {/* <Nav /> */}
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <th scope="col">Lorem</th>
                        <th scope="col">Ipsum</th>
                        <th scope="col">Dolor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Sit</td>
                        <td>Amet</td>
                        <td>Consectetur</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <td>Adipisicing</td>
                        <td>Elit</td>
                        <td>Sint</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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

export default TrangKhachHang;