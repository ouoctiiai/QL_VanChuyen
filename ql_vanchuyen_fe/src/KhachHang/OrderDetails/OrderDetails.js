import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { memo } from 'react';
import { getVanDonById} from '../../Api/DataVanDon';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const OrderDetails = () => {
    // const id = localStorage.getItem("id");
    const {id} = useParams();
    const [chiTietdonHang, setChiTietDonHang] = useState([]);
    const [thongTinNguoiNhan, setThongTinNguoiNhan] = useState('');
    const [thongTinHangHoa, setThongTinHangHoa] = useState('');
    const [phiVanChuyen, setPhiVanChuyen] = useState('');
    const [thongTinShipper, setThongTinShipper] =useState('');

    useEffect(()=>{
        if(id){
            getVanDonById(id).then((response) =>{
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
    }, [id])

    return (
        <div className='order-detail-container'>
            <div >
                <h3><i class="fa-solid fa-clipboard-list"></i> Chi tiết đơn hàng</h3>
                <div>
                    <h3>Thông tin hàng hoá</h3>
                    <div className='p-3'>
                        <h4>Mã đơn hàng</h4>
                        <label>{chiTietdonHang.maVanDon}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Thời gian lập đơn hàng</h4>
                        <label>{chiTietdonHang.thoiGianLap}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Loại vận chuyển</h4>
                        <label>{chiTietdonHang.loaiVanChuyen}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Người thanh toán</h4>
                        <label>{chiTietdonHang.nguoiThanhToan}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Loại hàng hoá</h4>
                        <label>{thongTinHangHoa.loaiHang}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Tên hàng</h4>
                        <label>{thongTinHangHoa.tenHang}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Trọng lượng</h4>
                        <label>{thongTinHangHoa.trongLuong}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Số lượng</h4>
                        <label>{thongTinHangHoa.soLuong}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Tổng phí</h4>
                        <label>{phiVanChuyen.tongPhi}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Người giao hàng</h4>
                        <label>{thongTinShipper.tenShipper}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Trạng thái đơn hàng</h4>
                        <label>{chiTietdonHang.trangThai}</label>
                    </div>
                </div>
                <div>
                    <h3>Thông tin người nhận</h3>
                    <div className='p-3'>
                        <h4>Tên</h4>
                        <label>{thongTinNguoiNhan.tenNguoiNhan}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Số điện thoại</h4>
                        <label>{thongTinNguoiNhan.sdtNguoiNhan}</label>
                    </div>
                    <div className='p-3'>
                        <h4>Địa chỉ</h4>
                        <label>{thongTinNguoiNhan.diaChiNguoiNhan}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(OrderDetails);