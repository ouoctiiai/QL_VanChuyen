import React from 'react'
import '../Styles/Profile.css'
import Navbar from'../Components/Navbar'


const Profile = () => {
  return (
    <>
    <Navbar/>
    <div class="container">
      <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card  bg-cardShip">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                    <div class="mt-3">
                      <h4>Nguyễn Quốc Thái</h4>
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
                      1375833381
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Tên ngân nàng</h6>
                    </div>
                    <div class="col-sm-7">
                      Vietcombank
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
                      SP001
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Tên tài khoản</h6>
                    </div>
                    <div class="col-sm-9">
                      ouoctiiai
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Điện thoại</h6>
                    </div>
                    <div class="col-sm-9">
                      (239) 816-9029
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Mail</h6>
                    </div>
                    <div class="col-sm-9">
                      luphi2612@gmail.com
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Địa chỉ</h6>
                    </div>
                    <div class="col-sm-9">
                      406/6 CỘng Hòa, Phường 13, Quận Tân Bình, TPHCM
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-12">
                      <a class=" " href="/UpdateProfile">Edit</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500">500</h6>
                                <p class="m-0px font-w-600">Happy Clients</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="150" data-speed="150">150</h6>
                                <p class="m-0px font-w-600">Project Completed</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="850" data-speed="850">850</h6>
                                <p class="m-0px font-w-600">Photo Capture</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="190" data-speed="190">190</h6>
                                <p class="m-0px font-w-600">Telephonic Talk</p>
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