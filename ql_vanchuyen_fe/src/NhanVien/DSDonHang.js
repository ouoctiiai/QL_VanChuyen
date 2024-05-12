import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';

const DSDonHang = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get('http://localhost:4433/vandon/danh-sach');
                setDanhSachDonHang(response.data);
            }catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='row-md-1 bg-white rounded' style={{marginTop: '15px'}}>
            <div className='col overflow-scroll' style={{maxHeight: '500px'}}>
                <table className='table text-left align-middle table-fixed table-bordered table-light' style={{fontSize: '18px'}}>
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
                        {danhSachDonHang.map((donHang, index) =>(
                            <tr key={index}>
                                <td>{donHang.maVanDon}</td>
                                <td>{donHang.thongTinNguoiGui.tenNguoiGui}</td>
                                <td>{donHang.thongTinNguoiNhan.tenNguoiNhan}</td>
                                <td>{donHang.thoiGianLap}</td>
                                <td>250000</td>
                                <td>{donHang.trangThai}</td>
                                <td className='text-center'>
                                    <NavLink to = '/chitietdh'>
                                        <i class="fa-solid fa-circle-info"></i>
                                    </NavLink>
                                    <span>&nbsp; &nbsp;</span>
                                    <NavLink to ='/'>
                                        <i class="far fa-edit"></i>
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DSDonHang;