import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { getTaiKhoanById } from '../../Api/DataTaiKhoan';


const Profile = () => {
  const [taiKhoan, setTaiKhoan] = useState([]);
  const [thongTinTaiKhoan, setThongTinTaiKhoan] = useState([]);

  useEffect(() => {
    try {
      const id = localStorage.getItem("userId");
      getTaiKhoanById(id).then((Response) => {
        setTaiKhoan(Response.data);
        setThongTinTaiKhoan(Response.data.thongTinTaiKhoan);
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  return (
    <>
      <div class="container">
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card  bg-cardShip">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                    <div class="mt-3">
                      <h4>{taiKhoan.tenChuTaiKhoan}</h4>
                      <p class="mb-1">Shipper</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-3  bg-cardShip">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Số tài khoản</h6>
                    </div>
                    <div class="col-sm-7">
                      {thongTinTaiKhoan.soTaiKhoan}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Tên ngân nàng</h6>
                    </div>
                    <div class="col-sm-7">
                      {thongTinTaiKhoan.tenNganHang}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3 bg-cardShip">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Mã Shipper</h6>
                    </div>
                    <div class="col-sm-9">
                      {taiKhoan.maShipper}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Tên tài khoản</h6>
                    </div>
                    <div class="col-sm-9">
                      {taiKhoan.tenTaiKhoan}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Điện thoại</h6>
                    </div>
                    <div class="col-sm-9">
                      {taiKhoan.sdt}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Mail</h6>
                    </div>
                    <div class="col-sm-9">
                      {taiKhoan.email}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Địa chỉ</h6>
                    </div>
                    <div class="col-sm-9">
                      {taiKhoan.diaChi}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-12">
                      <button type="button" class="styling">
                        <a className='text-primary' href="/UpdateProfile">Edit</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile