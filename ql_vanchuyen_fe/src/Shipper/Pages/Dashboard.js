import React, { useEffect, useState } from 'react'
import '../Styles/Dashboard.css'
import Navbar from '../Components/Navbar';
import {getTongDonCuaShipper, getTongDonDaGiaoCuaShipper} from '../../Api/DataVanDon';
import { getTaiKhoanById } from '../../Api/DataTaiKhoan';


const Dashboard = () => {

    const[tongDon, setTongDon] = useState(null);
    const[tongDonDaGiao, setTongDonDaGiao] = useState(null);
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
                    <h6 class="m-b-20">Số đơn trong tuần</h6>
                    <h2 class="text-right"><span>29</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">29</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card order-card bg-cardShip">
                <div class="card-block">
                    <h6 class="m-b-20">Số đơn trong tháng</h6>
                    <h2 class="text-right"><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">486</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card  order-card bg-cardShip">
                <div class="card-block">
                    <h6 class="m-b-20">Số đơn đã hủy</h6>
                    <h2 class="text-right"><span>486</span></h2>
                    <p class="m-b-0">from last month<span class="f-right">+5.4 %</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card order-card bg-cardShip">
                <div class="card-block">
                    <h6 class="m-b-20">Tổng đơn đã chạy</h6>
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
                            <h5 class="pricing-title bg-info-hover text-white">STARTER</h5>
                        </div>
                        <div class="pricing-table-price text-center bg-info">
                            <p class="title-font">
                                <span class="pricing-period text-white mr-1">From</span>
                                <span class="pricing-currency text-white">$</span>
                                <span class="pricing-price text-white">9.99</span>
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

               <div class="col-md-4">
                    <div class="pricing-table bg-cardShip">
                        <div class="pricing-table-title">
                            <h5 class="pricing-title bg-primary-hover text-white">BUSINESS</h5>
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
                            <h5 class="pricing-title bg-info-hover text-white">ENTERPRISE</h5>
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