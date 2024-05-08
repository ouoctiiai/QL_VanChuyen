import React from 'react';
import '../Styles/ListDonCho.css';
const list = [
  {
    loaihang: 'Thực phẩm',
    diemnhan: '58 ngõ 79, Hữu Nghị, Hòa Bình, Việt Nam',
    diemgiao: '368 Đ. Hùng Vương. Phường 3. Tân An. Long An. Việt Nam',
    thuclinh: 23000,
    sokm: 12
  },
  {
    loaihang: 'Đồ gia dụng',
    diemnhan: '281 P. Đội Cấn, Liễu Giai, Ba Đình, Hà Nội, Việt Nam',
    diemgiao: 'Lạc Long Quân, Phường 10, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam',
    thuclinh: 21000,
    sokm: 23
  },
  {
    loaihang: 'Hàng thông thường',
    diemnhan: '24 Phạm Nhữ Tăng, Hòa Khê, Thanh Khê, Đà Nẵng 550000, Việt Nam',
    diemgiao: '237 Đ. Cầu Giấy, Dịch Vọng, Cầu Giấy, Hà Nội, Việt Nam',
    thuclinh: 29000,
    sokm: 16
  },
  {
    loaihang: 'Hàng thông thường',
    diemnhan: '58 ngõ 79, Hữu Nghị, Hòa Bình, Việt Nam',
    diemgiao: '249 Hà Huy Tập, Hòa Khê, Thanh Khê, Đà Nẵng 550000, Việt Nam',
    thuclinh: 12000,
    sokm: 9
  },
  {
    loaihang: 'Thực phẩm',
    diemnhan: '578 Đ. Nguyễn Chí Thanh, Phường 7, Quận 5, Thành phố Hồ Chí Minh, Việt Nam',
    diemgiao: '368 Đ. Hùng Vương. Phường 3. Tân An. Long An. Việt Nam',
    thuclinh: 34000,
    sokm: 10
  },
  {
    loaihang: 'Hàng thông thường',
    diemnhan: '24 Phạm Nhữ Tăng, Hòa Khê, Thanh Khê, Đà Nẵng 550000, Việt Nam',
    diemgiao: '237 Đ. Cầu Giấy, Dịch Vọng, Cầu Giấy, Hà Nội, Việt Nam',
    thuclinh: 29000,
    sokm: 16
  },
  {
    loaihang: 'Hàng thông thường',
    diemnhan: '58 ngõ 79, Hữu Nghị, Hòa Bình, Việt Nam',
    diemgiao: '249 Hà Huy Tập, Hòa Khê, Thanh Khê, Đà Nẵng 550000, Việt Nam',
    thuclinh: 12000,
    sokm: 9
  },
  {
    loaihang: 'Thực phẩm',
    diemnhan: '578 Đ. Nguyễn Chí Thanh, Phường 7, Quận 5, Thành phố Hồ Chí Minh, Việt Nam',
    diemgiao: '368 Đ. Hùng Vương. Phường 3. Tân An. Long An. Việt Nam',
    thuclinh: 34000,
    sokm: 10
  }
];

const ListDonCho = () => {
  return (
    <div className='container'>
    <div className='orderlistcard'>
      <div class="row">
        <div class="col-lg-12">
          <div class="align-items-center row">
              <div class="col-lg-10">
                  <div class="mb-3 mb-lg-0"><h6 class="fs-16 mb-0">Danh sách đơn đang chờ xử lý</h6></div>
              </div>
              <div class="col-lg-2">
                <div class="candidate-list-widgets">
                    <div class="selection-widget">
                        <select class="form-select" data-trigger="true" name="choices-single-filter-orderby" id="choices-single-filter-orderby" aria-label="Default select example">
                            <option value="tphcm">TPHCM</option>
                            <option value="hn">Hà Nội</option>
                            <option value="dn">Đà Nẵng</option>
                        </select>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
                
      <div class="row">
        <div class="col-xl-12">
          <div class="row align-items-center">
              <div class="table-responsive px-3">
                  <table class="table table-striped align-middle table-nowrap">
                      <tbody>
                          {list.map((item) => (
                            <tr>

                              <td>
                                  <div>
                                      <h5 class="font-size-18"><a href="ecommerce-product-detail.html" class="text-light">{item.loaihang}</a></h5>
                                  </div>
                              </td>

                              <td>
                                  <ul class="list-unstyled ps-0 mb-0">
                                      <li><p class="text-muted mb-1 text-truncate"><i class="mdi mdi-circle-medium align-middle text-primary me-1">-</i> Điểm nhận: {item.diemnhan} </p></li>
                                      <li><p class="text-muted mb-1 text-truncate"><i class="mdi mdi-circle-medium align-middle text-primary me-1">-</i> Điểm giao: {item.diemgiao} </p></li>
                                  </ul>
                              </td>

                              <td>
                                  <h3 class="mb-0 font-size-20"><b>{item.sokm}km</b></h3>
                              </td>

                              <td>
                                  <h3 class="mb-0 font-size-20"><b>{item.thuclinh}đ</b></h3>
                              </td>

                              <td>
                                  <button type="button" class="btn btn-primary waves-effect waves-light"><i class="bx bx-cart me-2 font-size-10 align-middle"></i>Nhận</button>
                              </td>
                          </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
  </div>
  </div>
  )
}

export default ListDonCho