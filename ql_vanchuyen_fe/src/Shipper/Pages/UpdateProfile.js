import React, { useEffect, useState } from 'react'
import '../Styles/UpdateProfile.css'
import Navbar from '../Components/Navbar';
import { getTaiKhoanById, updateTKShipper } from '../../Api/DataTaiKhoan';
import '../Styles/btnShip.css'

const UpdateProfile = () => {
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

    const handleFormSubmit = async (values) => {
    try {
        const response = await updateTKShipper(values.id, values.tenChuTaiKhoan, values.tenTaiKhoan, values.matKhau, values.sdt, values.email, values.tenNganHang, values.soTK);
        console.log('Update tài khoản thành công:', response.data);
        alert('Update tài khoản thành công!');
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Lỗi: ' + error.message);
    }
    };

    const handleUpdate = async () => {
    const id = localStorage.getItem("userId");
    const values = {
        id: id,
        tenChuTaiKhoan: taiKhoan.tenChuTaiKhoan,
        tenTaiKhoan: taiKhoan.tenTaiKhoan,
        matKhau: taiKhoan.matKhau,
        sdt: taiKhoan.sdt,
        email: taiKhoan.email,
        tenNganHang: thongTinTaiKhoan.tenNganHang,
        soTK: thongTinTaiKhoan.soTaiKhoan
    }
    await handleFormSubmit(values);
    };

    const handleInputChangeTaiKhoan = (event) => {
        const { name, value } = event.target;
        setTaiKhoan({ ...taiKhoan, [name]: value });
      };   
    
    const handleInputChangeTTTaiKhoan = (event) => {
    const { name, value } = event.target;
    setThongTinTaiKhoan({ ...thongTinTaiKhoan, [name]: value });
    };   

  return (
    <>
    <Navbar />
    <div class="container">
        <div class="row gutters">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                    <div class="card-body bg-cardShip">
                        <div class="account-settings">
                            <div class="user-profile">
                                <div class="user-avatar">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                                </div>
                                <h5 class="user-name text-primary">{taiKhoan.tenChuTaiKhoan}</h5>
                                <h6 class="user-email text-primary">{taiKhoan.email}</h6>
                            </div>
                            <div class="about">
                                <h5 class="mb-2 text-primary">About</h5>
                                <p>I'm {taiKhoan.tenChuTaiKhoan}. I am a shipper of Spring shipping unit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                    <div class="card-body bg-cardShip">
                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 class="mb-3 text-primary">Personal Details</h6>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="fullName">Tên chủ tài khoản</label>
                                    <input type="text" class="form-control" id="fullName" placeholder={taiKhoan.tenChuTaiKhoan} onChange={handleInputChangeTaiKhoan} name="tenChuTaiKhoan"/>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="eMail">Tên tài khoản</label>
                                    <input type="email" class="form-control" id="eMail" placeholder={taiKhoan.tenTaiKhoan} onChange={handleInputChangeTaiKhoan} name="tenTaiKhoan"/>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="phone">Mật khẩu</label>
                                    <input type="text" class="form-control" id="phone" placeholder={taiKhoan.matKhau} onChange={handleInputChangeTaiKhoan} name="matKhau"/>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="website">Số điện thoại</label>
                                    <input type="url" class="form-control" id="website" placeholder={taiKhoan.sdt} onChange={handleInputChangeTaiKhoan} name="sdt"/>
                                </div>
                            </div>
                        </div>
                        <div class="row gutters">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="Street">Email</label>
                                    <input type="name" class="form-control" id="Street" placeholder={taiKhoan.email} onChange={handleInputChangeTaiKhoan} name="email"/>
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 class="mb-3 text-primary">Thông tin tài khoản ngân hàng</h6>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="ciTy">Tên ngân hàng</label>
                                    <input type="name" class="form-control" id="ciTy" placeholder={thongTinTaiKhoan.tenNganHang} onChange={handleInputChangeTTTaiKhoan} name="tenNganHang"/>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="sTate">Số tài khoản</label>
                                    <input type="text" class="form-control" id="sTate" placeholder={thongTinTaiKhoan.soTaiKhoan} onChange={handleInputChangeTTTaiKhoan} name="soTaiKhoan"/>
                                </div>
                            </div>
                        </div>
                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="text-right">
                                    <button type="button" class="styling">
                                            <a className='text-primary' href='/profile'>Cancel</a>
                                    </button>
                                    <button type="button" class="styling" >
                                            <a className='text-primary' onClick={() => handleUpdate()}>Update</a>
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

export default UpdateProfile
