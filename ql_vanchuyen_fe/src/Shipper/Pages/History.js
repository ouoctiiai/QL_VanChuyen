import { useEffect, useState } from 'react';
import '../Styles/History.css'
import Navbar from '../Components/Navbar';
import { lichSuDonCuaShipper } from '../../Api/DataVanDon';
import { getTaiKhoanById } from '../../Api/DataTaiKhoan';

const History = () => {

  const [vandons, setVanDons] = useState([]);
  const [taiKhoan, setTaiKhoan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await getTaiKhoanById(id);
        setTaiKhoan(response.data);
  
        const shipperData = await lichSuDonCuaShipper(taiKhoan.maShipper);
        setVanDons(shipperData.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [taiKhoan]);


  return (   
    <>
    <Navbar />
     <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="main-box clearfix">
            <div class="table-responsive">
              <table class="table user-list">
                <thead>
                  <tr>
                    <th><span>User</span></th>
                    <th><span>Mã vận đơn</span></th>
                    <th class="text-center"><span>Số tiền nhận được</span></th>
                    <th><span>Trạng thái</span></th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                {vandons.map((item) => (
                  <tr>
                    <td>
                      <img src="https://ich.edu.vn/App_Files/Upload/2019/icon-thanh-cong.png" alt="" />
                      <span class="user-link text-size17">{item.thoiGianLapToString}</span>
                      <span class="user-subhead text-size17">{item.trangThai}</span>
                    </td>
                    <td >
                      <span class="label label-default text-size17">{item.maVanDon}</span>
                    </td>
                    <td class="text-center">
                      <span class="label label-default text-size17">{item.phiVanChuyen.luongShipperTheoDon}đ</span>
                    </td>
                    <td>
                    <span class="label label-default text-size17">{item.trangThai}</span>
                    </td>
                    <td>
                      <a href={`/detailhistory/${item.id}`} class="table-link">
                        <span class="fa-stack">
                          <i class="fa fa-square fa-stack-2x"></i>
                          <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
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
      </>
  )
}

export default History
