import React, { useEffect, useState } from 'react'
import Mapbox from '../Components/Mapbox'
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getVanDonById } from '../../Api/DataVanDon';

const DetailOrder = () => {
  const{ id } = useParams();
  const[detailorder, setdetailorder] = useState('')
  const[thongTinNguoiGui, setThongTinNguoiGui] = useState('')
  const[thongTinNguoiNhan, setThongTinNguoiNhan] = useState('')
  const[thongTinHangHoa, setThongTinHangHoa] = useState('')
  const[thongTinPhi, setThongTinPhi] = useState('')

  useEffect(() => {
    if(id){
      getVanDonById(id).then((response) => {
        console.log(response.data);
		setThongTinNguoiGui(response.data.thongTinNguoiGui);
		setThongTinNguoiNhan(response.data.thongTinNguoiNhan);
		setThongTinHangHoa(response.data.thongTinHangHoa);
		setThongTinPhi(response.data.phiVanChuyen);
        setdetailorder(response.data);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  return (
    <div>
      <>
      <Navbar />
      <div class="container">
		<div class="main-body">
			<div class="row">
				<div class="col-lg-4">
					<div class="card bg-cardShip">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">
								<div class="mt-3">
									<h4>Mã vận đơn: {detailorder.maVanDon}</h4>
									<p class="mb-1">Thời gian lập: {detailorder.thoiGianLapToString}</p>
									<p class="text-muted font-size-sm">Tiền nhận được: {thongTinPhi.luongShipperTheoDon}đ</p>
									<button class="btn btn-primary">Nhận đơn</button>
								</div>
							</div>
							<hr class="my-4" />
								<div class="row mb-3">
									<div class="col-sm-5">
										<h6 class="mb-0">Loại hàng</h6>
									</div>
									<div class="col-sm-7 ">
										<p class="mb-1">{thongTinHangHoa.loaiHang}</p>
									</div>
								</div>

								<div class="row mb-4">
									<div class="col-sm-5">
										<h6 class="mb-0">Tên hàng:</h6>
									</div>
									<div class="col-sm-7 ">
										<p class="mb-1">{thongTinHangHoa.tenHang}</p>
									</div>
								</div>

								<div class="row mb-3">
									<div class="col-sm-5">
										<h6 class="mb-0">Cân nặng:</h6>
									</div>
									<div class="col-sm-7 ">
										<p class="mb-1">{thongTinHangHoa.trongLuong}kg</p>
									</div>
								</div>

								<div class="row mb-3">
									<div class="col-sm-5">
										<h6 class="mb-0">Khoảng cách:</h6>
									</div>
									<div class="col-sm-7 ">
										<p class="mb-1">{detailorder.khoangCach} km</p>
									</div>
								</div>
						</div>
					</div>
					
				</div>
				<div class="col-lg-8">
					<div class="card bg-cardShip">
						<div class="card-body">
							<h4 class="mb-0">Thông tin người gửi</h4>
							<br />
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Tên người gửi</h6>
								</div>
								<div class="col-sm-9 ">
									<p class="mb-1">{thongTinNguoiGui.tenNguoiGui}</p>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Số điện thoại</h6>
								</div>
								<div class="col-sm-9 ">
									<p class="mb-1">{thongTinNguoiGui.sdtNguoiGui}</p>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Địa chỉ lấy hàng</h6>
								</div>
								<div class="col-sm-9 ">
									<p class="mb-1">{thongTinNguoiGui.diaChiNguoiGui}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<div class="card bg-cardShip">
								<div class="card-body">
								<h4 class="mb-0">Thông tin người nhận</h4>
								<br />
								<div class="row mb-3">
									<div class="col-sm-3">
									<h6 class="mb-0">Tên người nhận</h6>
									</div>
									<div class="col-sm-9">
									<p class="mb-1">{thongTinNguoiNhan.tenNguoiNhan}</p>
									</div>
								</div>
								<div class="row mb-3">
									<div class="col-sm-3">
									<h6 class="mb-0">Số điện thoại</h6>
									</div>
									<div class="col-sm-9">
									<p class="mb-1">{thongTinNguoiNhan.sdtNguoiNhan}</p>                    
									</div>
								</div>
								<div class="row mb-3">
									<div class="col-sm-3">
									<h6 class="mb-0">Địa chỉ giao hàng</h6>
									</div>
									<div class="col-sm-9">
									<p class="mb-1">{thongTinNguoiNhan.diaChiNguoiNhan}</p>                    
									</div>
								</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<div class="card bg-cardShip">
								<div class="card-body">
									<Mapbox from={thongTinNguoiGui.diaChiNguoiGui} to={thongTinNguoiNhan.diaChiNguoiNhan} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
      </>
    </div>
  )
}

export default DetailOrder
