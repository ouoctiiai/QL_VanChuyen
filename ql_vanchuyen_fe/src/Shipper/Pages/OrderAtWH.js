import { useEffect, useState } from 'react';
import '../Styles/OrderAtWH.css';
import {getVanDonByMaVD, updateTrangThaiDangGiaoHangLoat} from '../../Api/DataVanDon';
import { getTaiKhoanById } from '../../Api/DataTaiKhoan';

const OrderAtWH = () => {
  const [selectVanDons, setSelectVanDons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const[taiKhoan, setTaiKhoan] = useState([]);
  const [detailVanDon, setDetailVanDon] = useState({
    thongTinHangHoa: {
      loaiHang: "",
      khoiLuong: "",
    },
    thongTinNguoiGui: {
      tenNguoiGui: "",
      sdtNguoiGui: "",
      diaChiNguoiGui: "",
    },
    thongTinNguoiNhan: {
      tenNguoiNhan: "",
      sdtNguoiNhan: "",
      diaChiNguoiNhan: "",
    },
  });
  

  useEffect(() => {
    const idShipper = localStorage.getItem("userId");
      	getTaiKhoanById(idShipper).then((Response) => {
        setTaiKhoan(Response.data);
      })
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    try {
      const response = await getVanDonByMaVD(searchQuery);
      const foundVanDon = response.data;
      if (foundVanDon) {
        setSelectVanDons([...selectVanDons, {
            id: foundVanDon.id, 
            selected: true, 
            maVanDon: foundVanDon.maVanDon,
            thongTinHangHoa: {
              loaiHang: foundVanDon.thongTinHangHoa.loaiHang,
              khoiLuong: foundVanDon.thongTinHangHoa.khoiLuong
            },
            thongTinNguoiGui: {
              tenNguoiGui: foundVanDon.thongTinNguoiGui.tenNguoiGui,
              sdtNguoiGui: foundVanDon.thongTinNguoiGui.sdtNguoiGui,
              diaChiNguoiGui: foundVanDon.thongTinNguoiGui.diaChiNguoiGui
            },
            thongTinNguoiNhan: {
              tenNguoiNhan: foundVanDon.thongTinNguoiNhan.tenNguoiNhan,
              sdtNguoiNhan: foundVanDon.thongTinNguoiNhan.sdtNguoiNhan,
              diaChiNguoiNhan: foundVanDon.thongTinNguoiNhan.diaChiNguoiNhan
            }
          }]);

          setDetailVanDon({
            thongTinHangHoa: {
              loaiHang: foundVanDon.thongTinHangHoa.loaiHang,
              khoiLuong: foundVanDon.thongTinHangHoa.trongLuong
            },
            thongTinNguoiGui: {
              tenNguoiGui: foundVanDon.thongTinNguoiGui.tenNguoiGui,
              sdtNguoiGui: foundVanDon.thongTinNguoiGui.sdtNguoiGui,
              diaChiNguoiGui: foundVanDon.thongTinNguoiGui.diaChiNguoiGui
            },
            thongTinNguoiNhan: {
              tenNguoiNhan: foundVanDon.thongTinNguoiNhan.tenNguoiNhan,
              sdtNguoiNhan: foundVanDon.thongTinNguoiNhan.sdtNguoiNhan,
              diaChiNguoiNhan: foundVanDon.thongTinNguoiNhan.diaChiNguoiNhan
            }
          });
      } else {
        alert('Không tìm thấy vận đơn.');
      }
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi tìm kiếm vận đơn.');
    }

    setSearchQuery('');
  };

  const getSelectedVanDonIds = () => {
    return selectVanDons.filter((item) => item.selected).map((item) => item.id);
  };

  const handleCheckboxChange = (id) => {
    setSelectVanDons(
      selectVanDons.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleFormSubmit = async () => {
    try {
        const response = await updateTrangThaiDangGiaoHangLoat(getSelectedVanDonIds(), taiKhoan.maShipper, taiKhoan.tenChuTaiKhoan, taiKhoan.sdt);
        console.log('Đã nhận đơn:', response.data);
        alert('Đã nhận đơn!');
        setSelectVanDons([]);
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Lỗi: ' + error.message);
    }
    };


  return (
    <>
    <div class="container">
    <div class="row">
        <div class="col-xl-8">
            <div class="card  bg-cardShip">
                <div class="card-body pb-0">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <div class="text-center border-endWH">
                                <img src="https://meksmart.com/storage/shares/IMG_DOMAIN/illus_3pl-01.png" class="img-fluid avatar-xxlWH rounded-circleWHWH" alt="" />
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="ms-3">
                                <div>
                                    <h4 class="card-title mb-2">Chọn đơn</h4>
                                    <form onSubmit={handleSearch}>
                                        <input
                                          type="text"
                                          className="form-control bg-light border-dark rounded"
                                          placeholder="Nhập mã vận đơn..."
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </form>
                                </div>
                                <div class="row my-4">
                                    <div class="col-md-12">
                                        <div>
                                            <p class="text-muted mb-2 fw-medium"><i class="mdi mdi-email-outline me-2"></i>Janshwells@probic.com
                                            </p>
                                            <p class="text-muted fw-medium mb-0"><i class="mdi mdi-phone-in-talk-outline me-2"></i>418-955-4703
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="styling" onClick={handleSearch}>
                               Thêm đơn
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card  bg-cardShip">
                <div class="tab-content p-4">
                    <div class="tab-pane active show" id="tasks-tab" role="tabpanel">
                        <h4 class="card-title mb-4">Danh sách</h4>
                        <div class="row">
                          {selectVanDons.map((item) => (
                            <div class="col-xl-12">
                                <div class="task-list-box" id="landing-task">
                                    <div id="task-item-1">
                                        <div class="card task-box rounded-3">
                                            <div class="card-body">
                                                <div class="row align-items-center">
                                                    <div class="col-xl-6 col-sm-5">
                                                        <div class="checklist form-check font-size-15">
                                                            <input
                                                              type="checkbox"
                                                              class="form-check-input"
                                                              id={`customCheck${item.id}`} 
                                                              checked={selectVanDons.find((vd) => vd.id === item.id)?.selected ?? false}
                                                              onChange={() => handleCheckboxChange(item.id)}
                                                            />
                                                            <label class="form-check-label ms-1 task-title" for="customCheck1">{item.maVanDon}</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-6 col-sm-7">
                                                        <div class="row align-items-center">
                                                            <div class="col-xl-5 col-md-6 col-sm-5">
                                                                <div class="avatar-groupWH mt-3 mt-xl-0 task-assigne">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-7 col-md-6 col-sm-7">
                                                                <div class="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                                    <div>
                                                                        <span class="badge rounded-pill badge-soft-success font-size-11 task-status">Đã thêm</span>
                                                                    </div>
                                                                    <div>
                                                                      <a href={`/detailorder/${item.id}`} className="table-link">
                                                                          <span className="fa-stack">
                                                                            <i className="fa fa-square fa-stack-2x"></i>
                                                                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                                          </span>
                                                                      </a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="#" class="mb-0 text-muted fw-medium" data-bs-toggle="modal" data-bs-target=".bs-example-new-task"><i class="mdi mdi-square-edit-outline font-size-16 align-middle" onclick="editTask('task-item-1')"></i></a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="#" class="delete-item" onclick="deleteProjects('task-item-1')">
                                                                            <i class="mdi mdi-trash-can-outline align-middle font-size-16 text-danger"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        <button className="styling" onClick={() => handleFormSubmit()}>
                          Nhận đơn
                      </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="card  bg-cardShip">
                <div class="card-body">
                    <div class="pb-2">
                        <div class="row">
                        <h4 class="card-title mb-4">Thông tin hàng</h4>
                        <div class="col-sm-5">
                          <h6 class="mb-0">Loại hàng</h6>
                        </div>
                        <div class="col-sm-7">
                          {detailVanDon.thongTinHangHoa.loaiHang}
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-5">
                          <h6 class="mb-0">Trọng lượng</h6>
                        </div>
                        <div class="col-sm-7">
                          {detailVanDon.thongTinHangHoa.khoiLuong}
                        </div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="card  bg-cardShip">
                <div class="card-body">
                    <div>
                        <h4 class="card-title mb-4">Thông tin người gửi</h4>
                        <div class="table-responsive">
                            <table class="tableWH table-borderedWH mb-0">
                                <tbody>
                                    <tr>
                                        <th scope="row">Tên</th>
                                        <td>{detailVanDon.thongTinNguoiGui.tenNguoiGui}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Số điện thoại</th>
                                        <td>{detailVanDon.thongTinNguoiGui.sdtNguoiGui}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Địa chỉ</th>
                                        <td>{detailVanDon.thongTinNguoiGui.diaChiNguoiGui}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card  bg-cardShip">
                <div class="card-body">
                    <div>
                        <h4 class="card-title mb-4">Thông tin người nhận</h4>
                        <div class="table-responsive">
                            <table class="tableWH table-borderedWH mb-0">
                                <tbody>
                                    <tr>
                                        <th scope="row">Tên</th>
                                        <td>{detailVanDon.thongTinNguoiNhan.tenNguoiNhan}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Số điện thoại</th>
                                        <td>{detailVanDon.thongTinNguoiNhan.sdtNguoiNhan}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Địa chỉ</th>
                                        <td>{detailVanDon.thongTinNguoiNhan.diaChiNguoiNhan}</td>
                                    </tr>
                                </tbody>
                            </table>
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

export default OrderAtWH