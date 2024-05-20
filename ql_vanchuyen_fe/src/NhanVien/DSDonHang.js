import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { listNgoaiTinh, listNoiTinh, listVanDon } from '../Api/DataVanDon';

const DSDonHang = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [dsDonNoiTinh, setDanhSachNoiTinh] = useState([]);
    const [dsDonNgoaiTinh, setDanhSachNgoaiTinh] = useState([]);
    const [loaiVanChuyen, setLoaiVanChuyen] = useState('Tất cả');

    useEffect(() => {
        try {
            listVanDon().then((Response) => {
                setDanhSachDonHang(Response.data);
            });
            
            listNoiTinh().then((Response) => {
                setDanhSachNoiTinh(Response.data);
            });

            listNgoaiTinh().then((Response) => {
                setDanhSachNgoaiTinh(Response.data);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const uniqueLoaiVanChuyen = Array.from(new Set(danhSachDonHang.map(donHang => donHang.loaiVanChuyen)));

    const handleLoaiVanChuyenChange = (event) => {
        setLoaiVanChuyen(event.target.value);
    };

    const locDonHang = loaiVanChuyen == 'Tất cả' ? danhSachDonHang :
        loaiVanChuyen == 'Liên tỉnh' ? dsDonNgoaiTinh : dsDonNoiTinh;

    return (
        <div>
            <select class="form-select" style={{marginBottom:'10px', marginTop:'15px', width:'300px'}} onChange={handleLoaiVanChuyenChange}>
                <option value = "Tất cả">Tất cả</option>
                {uniqueLoaiVanChuyen.map((donHang, index) => 
                    <option key={index} value={donHang}>{donHang}</option>
                )}
            </select>
            <div className='row-md-1 bg-white rounded'>
                <div className='col overflow-scroll' style={{maxHeight: '500px'}}>
                    <table className='table text-left align-middle table-fixed table-bordered table-light table-striped' style={{fontSize: '18px', color:'white'}}>
                        <thead className= 'table-success' style={{position: 'sticky', top: '0', textAlign: 'center', zIndex: '1'}}>
                            <tr>
                                <th>Mã vận đơn</th>
                                <th>Tên người gửi</th>
                                <th>Tên người nhận</th>
                                <th>Thời gian lập</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th className='col-1'></th>
                            </tr>
                        </thead>

                        <tbody>
                            {locDonHang.map((donHang) =>(
                                <tr>
                                    <td>{donHang.maVanDon}</td>
                                    <td>{donHang.thongTinNguoiGui.tenNguoiGui}</td>
                                    <td>{donHang.thongTinNguoiNhan.tenNguoiNhan}</td>
                                    <td>{donHang.thoiGianLap}</td>
                                    <td className='text-end'>{donHang.phiVanChuyen.tongPhi}</td>
                                    <td>{donHang.trangThai}</td>
                                    <td className='text-center'>
                                        <NavLink to = {`/chitietdh/${donHang.id}`}>
                                            <i class="fa-solid fa-circle-info" style={{color: 'black'}}></i>
                                        </NavLink>
                                        <span>&nbsp; &nbsp;</span>
                                        <NavLink to =''>
                                            <i class="far fa-edit" style={{color: 'black'}}></i>
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DSDonHang;