import { useEffect, useState } from 'react';
import '../Styles/ListDonCho.css';
import Navbar from '../Components/Navbar';
import { listDonChoTheoTinh } from '../../Api/DataVanDon';

const ListDonCho = () => {
  const [vandons, setVanDons] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState('TP Hồ Chí Minh'); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listDonChoTheoTinh(selectedTinh);
        setVanDons(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); 
  }, [selectedTinh]); 

  const handleTinhChange = (event) => {
    setSelectedTinh(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="orderlistcard">
          <div className="row">
            <div className="col-lg-12">
              <div className="align-items-center row">
                <div className="col-lg-10">
                  <div className="mb-3 mb-lg-0">
                    <h6 className="fs-16 mb-0">
                      Danh sách đơn đang chờ xử lý tại {selectedTinh}
                    </h6>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="candidate-list-widgets">
                    <div className="selection-widget">
                      <select
                        className="form-select"
                        data-trigger="true"
                        name="choices-single-filter-orderby"
                        id="choices-single-filter-orderby"
                        aria-label="Lọc theo tỉnh"
                        value={selectedTinh}
                        onChange={handleTinhChange}
                      >
                        <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        {/* Add more options as needed */}
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
                          {vandons.map((item) => (
                            <tr>

                              <td>
                                  <div>
                                      <h5 class="font-size-18"><a href={`/detailorder/${item.id}`}>{item.thoiGianLapToString}</a></h5>
                                  </div>
                              </td>

                              <td>
                                  <ul class="list-unstyled ps-0 mb-0">
                                        <li>
                                            <p class="text-muted mb-1 text-truncate">
                                                <i class="mdi mdi-circle-medium align-middle me-1">-</i>
                                                Điểm nhận: {item.thongTinNguoiGui.diaChiNguoiGui} 
                                            </p>
                                        </li>
                                        <li>
                                            <p class="text-muted mb-1 text-truncate">
                                                <i class="mdi mdi-circle-medium align-middle me-1">-</i> 
                                                Điểm giao: {item.thongTinNguoiNhan.diaChiNguoiNhan} 
                                            </p>
                                        </li>
                                  </ul>
                              </td>

                              <td>
                                  <h3 class="mb-0 font-size-20 text-primary"><b>{item.khoangCach}km</b></h3>
                              </td>

                              <td>
                                  <h3 class="mb-0 font-size-20 text-primary"><b>{item.phiVanChuyen.tongPhi}đ</b></h3>
                              </td>

                              <td>
                                  <button type="button" 
                                        class="btn btn-primary waves-effect waves-light">
                                            <a className='text-light' href={`/detailorder/${item.id}`}>Chi tiết</a>
                                    </button>
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
  </>
  )
}

export default ListDonCho