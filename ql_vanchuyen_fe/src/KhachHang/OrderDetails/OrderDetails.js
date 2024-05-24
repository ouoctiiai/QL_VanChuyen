import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { memo } from 'react';
import { getVanDonById } from '../../Api/DataVanDon';
import './OrderDetails.scss'

const OrderDetails = () => {
    // const id = localStorage.getItem("id");
    const idOrder = localStorage.getItem("idOrder");
    const [chiTietdonHang, setChiTietDonHang] = useState('');
    const [thongTinNguoiNhan, setThongTinNguoiNhan] = useState('');
    const [thongTinHangHoa, setThongTinHangHoa] = useState('');
    const [phiVanChuyen, setPhiVanChuyen] = useState('');
    const [thongTinShipper, setThongTinShipper] = useState('');

    useEffect(() => {
        if (idOrder) {
            getVanDonById(idOrder).then((response) => {
                console.log(response.data);
                setThongTinNguoiNhan(response.data.thongTinNguoiNhan);
                setThongTinHangHoa(response.data.thongTinHangHoa);
                setPhiVanChuyen(response.data.phiVanChuyen);
                setThongTinShipper(response.data.thongTinShipper);
                setChiTietDonHang(response.data);
            }).catch((error) => {
                console.error(error);
            })
        }
    }, [idOrder]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className='order-detail-container'>
            <div style={{ marginTop: '20px' }}>
                <div className='' style={{ backgroundColor: 'white', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)', margin: '30px', border: '2px solid #7579E7', borderRadius: '10px', padding: '10px' }}>
                    <h3>Thông tin hàng hoá</h3>
                    <div className='row'>
                        <div className='col-5' style={{ backgroundColor: '#d1efff', borderRadius: '10px', margin: '30px', padding: '20px' }}>
                            <div className='d-flex details-text'>
                                <p className='details-text-title'>Mã đơn hàng: </p>
                                <p className='details-text-content'> {chiTietdonHang.maVanDon}</p>
                            </div>
                            <div className='d-flex'>
                                <p className='details-text-title'>Thời gian lập đơn hàng: </p>
                                <p className='details-text-content'> {formatDate(chiTietdonHang.thoiGianLap)}</p>
                            </div>
                            <div className='d-flex'>
                                <p className='details-text-title'>Loại vận chuyển: </p>
                                <p className='details-text-content'> {chiTietdonHang.loaiVanChuyen}</p>
                            </div>
                            <div className='d-flex'>
                                <p className='details-text-title'>Người giao hàng: </p>
                                <p className='details-text-content'> {thongTinShipper.tenShipper}</p>
                            </div>
                        </div>
                        <div className='col-5' style={{ backgroundColor: '#F3D0D7', borderRadius: '10px', margin: '30px', padding: '20px' }}>
                            <div className='d-flex'>
                                <p className='details-text-title'>Loại hàng hoá:</p>
                                <p className='details-text-content'>{thongTinHangHoa.loaiHang}</p>
                            </div>
                            <div className='d-flex'>
                                <p className='details-text-title'>Tên hàng:</p>
                                <p className='details-text-content'>{thongTinHangHoa.tenHang || "Khác"}</p>
                            </div>
                            <div className='d-flex'>
                                <p className='details-text-title'>Trọng lượng:</p>
                                <p className='details-text-content'>{thongTinHangHoa.trongLuong}</p>
                            </div>
                            <div className='d-flex'>
                                <p className='details-text-title'>Số lượng:</p>
                                <p className='details-text-content'>{thongTinHangHoa.soLuong}</p>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5' style={{ backgroundColor: '#FDFFC2', borderRadius: '10px', margin: '30px', padding: '20px' }}>
                            <div className='d-flex'>
                                <p className='details-text-title'>Tổng phí:</p>
                                <p className='details-text-content'>{phiVanChuyen.tongPhi}</p>
                            </div>
                        </div>
                        <div className='col-5' style={{ backgroundColor: '#94FFD8', borderRadius: '10px', margin: '30px', padding: '20px' }}>
                            <div className='d-flex'>
                                <p className='details-text-title'>Trạng thái đơn hàng:</p>
                                <p className='details-text-content'>{chiTietdonHang.trangThai}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: 'white', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)', margin: '30px', border: '2px solid #7579E7', borderRadius: '10px', padding: '10px' }}>
                    <h3>Thông tin người nhận</h3>
                    <div className='row'>
                        <div className='col-5' style={{ backgroundColor: '#F0EBE3', borderRadius: '10px', margin: '30px', padding: '20px' }}>
                            <div className='d-flex'>
                                <p className='details-text-title'>Tên:</p>
                                <p className='details-text-content'>{thongTinNguoiNhan.tenNguoiNhan}</p>
                            </div>
                        </div>
                        <div className='col-5' style={{ backgroundColor: '#FFD9B7', borderRadius: '10px', margin: '30px', padding: '20px' }}>
                            <div className='d-flex'>
                                <p className='details-text-title'>Số điện thoại:</p>
                                <p className='details-text-content'>{thongTinNguoiNhan.sdtNguoiNhan}</p>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{ backgroundColor: '#FFCDEA', borderRadius: '10px', margin: '30px', padding: '20px' }}>
                        <div className='d-flex'>
                            <p className='details-text-title'>Địa chỉ:</p>
                            <p className='details-text-content'>{thongTinNguoiNhan.diaChiNguoiNhan}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(OrderDetails);