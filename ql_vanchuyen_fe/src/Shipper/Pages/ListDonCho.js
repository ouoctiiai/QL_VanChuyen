import { useEffect, useState } from 'react';
import '../Styles/ListDonCho.css';
import Navbar from '../Components/Navbar';
import { listVanDon } from '../../Api/DataVanDon';

const ListDonCho = () => {

  const [vandons, setVanDons] = useState([])

  useEffect(() => {
      listVanDon().then((Response) =>{
        setVanDons(Response.data);
      }).catch(error => {
        console.error(error);
      })
  }, [])


  return (
    <>
    <Navbar />
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
                        <select class="form-select" 
                                data-trigger="true" 
                                name="choices-single-filter-orderby" 
                                id="choices-single-filter-orderby" 
                                aria-label="Default select example">
                            <option value="tphcm">TP Hồ Chí Minh</option>
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
                          {vandons.map((item) => (
                            <tr>

                              <td>
                                  <div>
                                      <h5 class="font-size-18"><a href="/detailorder">{item.thongTinHangHoa.loaiHang}</a></h5>
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
                                            <a className='text-light' href={`/detailorder/${item.id}`}>Nhận</a>
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