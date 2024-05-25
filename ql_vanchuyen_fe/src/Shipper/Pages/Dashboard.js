import React, { useEffect, useState } from 'react'
import '../Styles/Dashboard.css'
import Navbar from '../Components/Navbar';
import {
    getTongDonCuaShipper, 
    getTongDonDaGiaoCuaShipper, 
    getTongDonDangGiaoCuaShipper, 
    getTongSoDonCuaShipperTrongThang,
    getTongSoDonCuaShipperTrongNgay
} from '../../Api/DataVanDon';
import { getTaiKhoanById } from '../../Api/DataTaiKhoan';


const Dashboard = () => {

    const[tongDon, setTongDon] = useState(null);
    const[tongDonDaGiao, setTongDonDaGiao] = useState(null);
    const[tongDonDangGiao, setTongDonDangGiao] = useState(null);
    const[tongSoDonTrongThang, setTongSoDonTrongThang] = useState(null);
    const[tongSoDonTrongNgay, setTongSoDonTrongNgay] = useState(null);
    const [taiKhoan, setTaiKhoan] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
              const id = localStorage.getItem("userId");
              const response = await getTaiKhoanById(id);
              setTaiKhoan(response.data);
        
              const getTongDon = await getTongDonCuaShipper(taiKhoan.maShipper);
              setTongDon(getTongDon.data);

              const getTongDonDaGiao = await getTongDonDaGiaoCuaShipper(taiKhoan.maShipper);
              setTongDonDaGiao(getTongDonDaGiao.data);

              const getTongDonDangGiao = await getTongDonDangGiaoCuaShipper(taiKhoan.maShipper);
              setTongDonDangGiao(getTongDonDangGiao.data);

              const getTongSoDonTrongThang = await getTongSoDonCuaShipperTrongThang(taiKhoan.maShipper);
              setTongSoDonTrongThang(getTongSoDonTrongThang.data); 

              const getTongSoDonTrongNgay = await getTongSoDonCuaShipperTrongNgay(taiKhoan.maShipper);
              setTongSoDonTrongNgay(getTongSoDonTrongNgay.data); 
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
        <div class="col-md-4 col-xl-3">
            <div class="card order-card bg-cardShip">
                <div class="card-block">
                    <h6 class="m-b-20">Số đơn trong ngày</h6>
                    <h2 class="text-right"><span>{tongSoDonTrongNgay}</span></h2>
                    <p class="m-b-0">Bạn có thể nhận thêm đơn hàng mới</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card order-card bg-cardShip">
                <div class="card-block">
                    <h6 class="m-b-20">Số đơn trong tháng</h6>
                    <h2 class="text-right"><span>{tongSoDonTrongThang}</span></h2>
                    <p class="m-b-0">Bạn có thể nhận thêm đơn hàng mới</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card  order-card bg-cardShip">
                <div class="card-block">
                    <h6 class="m-b-20">Số đơn đang giao</h6>
                    <h2 class="text-right"><span>{tongDonDangGiao}</span></h2>
                    <p class="m-b-0">Vui lòng hoàn thành nhanh<span class="f-right">!!!</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card order-card bg-cardShip">
                <div class="card-block">
                    <h6 class="m-b-20">Tổng đơn đã nhận</h6>
                    <h2 class="text-right"><span>{tongDon}</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">{tongDonDaGiao}</span></p>
                </div>
            </div>
        </div>
	  </div>
    <section id="pricing">
            <div class="spacer spacer-line border-primary">&nbsp;</div>
            <div class="spacer">&nbsp;</div>
            <div class="row">
                <div class="col-md-4">
                    <div class="pricing-table bg-cardShip">
                        <div class="pricing-table-title">
                            <h5 class="pricing-title bg-info-hover text-white">TIỀN CHƯA THANH TOÁN</h5>
                        </div>
                        <div class="pricing-table-price text-center bg-info">
                            <p class="title-font">
                                <span class="pricing-period text-white mr-1">Được </span>
                                <span class="pricing-price text-white">9.99</span>
                                <span class="pricing-period text-white">vnđ</span>
                            </p>
                        </div>
                        <div class="pricing-table-content">
                            <div class="pricing-table-button">
                                <a href="#x" class="btn btn-info"><span>Request Quote</span></a>
                            </div>
                        </div>
                    </div>
                </div>

               <div class="col-md-4">
                    <div class="pricing-table bg-cardShip">
                        <div class="pricing-table-title">
                            <h5 class="pricing-title bg-primary-hover text-white">TỔNG SỐ TIỀN THƯỞNG</h5>
                        </div>
                        <div class="pricing-table-price text-center bg-primary">
                            <p class="title-font">
                                <span class="pricing-period text-white mr-1">From</span>
                                <span class="pricing-currency text-white">$</span>
                                <span class="pricing-price text-white">29.99</span>
                                <span class="pricing-period text-white">/ Mo.</span>
                            </p>
                        </div>
                        <div class="pricing-table-content">
                            <div class="pricing-table-button">
                                <a href="#x" class="btn btn-primary"><span>Request Quote</span></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="pricing-table bg-cardShip">
                        <div class="pricing-table-title">
                            <h5 class="pricing-title bg-info-hover text-white">TỔNG TIỀN ĐÃ NHẬN</h5>
                        </div>
                        <div class="pricing-table-price text-center bg-info">
                            <p class="title-font">
                                <span class="pricing-period text-white mr-1">From</span>
                                <span class="pricing-currency text-white">$</span>
                                <span class="pricing-price text-white">49.99</span>
                                <span class="pricing-period text-white">/ Mo.</span>
                            </p>
                        </div>
                        <div class="pricing-table-content">
                            <div class="pricing-table-button">
                                <a href="#x" class="btn btn-info"><span>Request Quote</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</div>
</>
  )
}

export default Dashboard