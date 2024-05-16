import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getVanDonById } from '../Api/DataVanDon';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Mapbox from '../Shipper/Components/Mapbox';

const ChiTietDonHang = () => {
    const{ id } = useParams();
    const[chiTietDon, setChiTietDon] = useState('')
    const[phiVanChuyen, setPhiVanChuyen] = useState('')
    const[thongTinHangHoa, setThongTinHangHoa] = useState('')
    const[thongTinNguoiGui, setThongTinNguoiGui] = useState('')
    const[thongTinNguoiNhan, setThongTinNguoiNhan] = useState('')
    const[thongTinShipper, setThongTinShipper] = useState('')

    useEffect(() => {
      if(id){
        getVanDonById(id).then((response) => {
          console.log(response.data);
          setPhiVanChuyen(response.data.phiVanChuyen);
          setThongTinHangHoa(response.data.thongTinHangHoa);
          setThongTinNguoiGui(response.data.thongTinNguoiGui);
          setThongTinNguoiNhan(response.data.thongTinNguoiNhan);
          setThongTinShipper(response.data.thongTinShipper);
          setChiTietDon(response.data);
        }).catch(error => {
          console.error(error);
        })
      }
    }, [id])


    return (
            <div className='row' style={{marginTop:'15px', marginLeft:'30px'}}>
                <div className='col'>
                    <div className='row'>
                        <div className='card' style={{width:'500px', height: '250px'}}>
                            <div className='card-body'>
                                <div className='card-title' style={{fontStyle: 'both', fontSize: '22px', textAlign: 'center'}}>Thông tin người gửi</div>
                                <table className='table' style={{fontSize: '18px'}}>
                                    <tr>
                                        <td className='col-4'>Tên người gửi: </td>
                                        <td>{thongTinNguoiGui.tenNguoiGui}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại: </td>
                                        <td>{thongTinNguoiGui.sdtNguoiGui}</td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ lấy hàng: </td> 
                                        <td>{thongTinNguoiGui.diaChiNguoiGui}</td>
                                        </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='card' style={{width:'500px'}}>
                            <div className='card-body'>
                                <div className='card-title' style={{fontStyle: 'both', fontSize: '22px', textAlign: 'center'}}>Thông tin đơn hàng</div>
                                <table className='table table-borderless' style={{fontSize: '18px'}}>
                                        <tr>
                                            <td className='col-3'>Mã vận đơn: </td>
                                            <td>{chiTietDon.maVanDon}</td>
                                        </tr>
                                        <tr>
                                            <td>Loại hàng:</td>
                                            <td>{thongTinHangHoa.loaiHang}</td>
                                        </tr>
                                        <tr>
                                            <td>Thời gian lập: </td>
                                            <td>{chiTietDon.thoiGianLap}</td>
                                        </tr>
                                        <tr>
                                            <td>Tên shipper: </td>
                                            <td>{thongTinShipper.tenShipper}</td>
                                        </tr>
                                        <tr>
                                            <td>Tổng phí:</td> 
                                            <td>{phiVanChuyen.tongPhi}</td>
                                        </tr>
                                        <tr>
                                            <td>Trạng thái:</td>
                                            <td>{chiTietDon.trangThai}</td>
                                        </tr>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col'>
                    <div className='row'>
                        <div className='card' style={{width:'500px', height:'250px'}}>
                            <div className='card-body'>
                                <div className='card-title' style={{fontStyle: 'both', fontSize: '22px', textAlign: 'center'}}>Thông tin người nhận</div>
                                <table className='table table-borderless' style={{fontSize: '18px'}}>
                                    <tr>
                                        <td className='col-4'>Tên người nhận: </td>
                                        <td>{thongTinNguoiNhan.tenNguoiNhan}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại:</td>
                                        <td>{thongTinNguoiNhan.sdtNguoiNhan}</td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ giao hàng: </td>
                                        <td>{thongTinNguoiNhan.diaChiNguoiNhan}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div class="card" style={{width:'500px'}}>
							<div class="card-body">
								<Mapbox from={thongTinNguoiGui.diaChiNguoiGui} to={thongTinNguoiNhan.diaChiNguoiNhan} />
							</div>
						</div>
                    </div>
                </div>
            </div>
        
    );
};

export default ChiTietDonHang;