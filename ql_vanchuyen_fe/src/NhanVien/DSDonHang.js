import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { listNgoaiTinh, listNoiTinh, listVanDon } from '../Api/DataVanDon';
import { Pagination } from 'react-bootstrap';

const DSDonHang = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [dsDonNoiTinh, setDanhSachNoiTinh] = useState([]);
    const [dsDonNgoaiTinh, setDanhSachNgoaiTinh] = useState([]);
    const [loaiVanChuyen, setLoaiVanChuyen] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);
    const rowsPerPage = 7;

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

    const totalPages = Math.ceil(locDonHang.length / rowsPerPage);
        // get current page's items
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentPageData = locDonHang.slice(startIndex, startIndex + rowsPerPage);
    
    // const getPageNumbers = () => {
    //     const pageNumbers = [];
    //     const maxPageItems = 5; // Number of page items to show at one time
    //     const startPage = Math.max(currentPage - Math.floor(maxPageItems / 2), 1);
    //     const endPage = Math.min(startPage + maxPageItems - 1, totalPages);

    //     for (let i = startPage; i <= endPage; i++) {
    //         pageNumbers.push(i);
    //     }

    //     return pageNumbers;
    // };

    useEffect(() => {
        const maxPageItems = 5; // Number of page items to show at one time
        const range = Math.floor(maxPageItems / 2);

        const startPage = Math.max(1, currentPage - range);
        const endPage = Math.min(totalPages, startPage + maxPageItems - 1);

        const newPageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            newPageNumbers.push(i);
        }

        setPageNumbers(newPageNumbers);
    }, [currentPage, totalPages]);

    return (
        <div>
            <div className='row' style={{marginBottom:'10px', marginTop:'15px'}}>
                <div className='col'>
                    <select class="form-select" style={{width:'200px'}} onChange={handleLoaiVanChuyenChange}>
                        <option value = "Tất cả">Tất cả</option>
                        {uniqueLoaiVanChuyen.map((donHang, index) => 
                            <option key={index} value={donHang}>{donHang}</option>
                        )}
                    </select>
                </div>
                <div className='col'>
                    
                </div>
            </div>
            
            <div className='row-md-1 bg-white rounded'>
                <div className='col overflow-scroll' style={{minHeight: '420px'}}>
                    <table className='table text-left align-middle table-bordered table-light table-striped' style={{fontSize: '18px', color:'white', borderCollapse:'collapse'}}>
                        <thead className= 'table-success' style={{position: 'sticky', top: '0', textAlign: 'center', zIndex: '1'}}>
                            <tr>
                                <th>STT</th>
                                <th>Mã vận đơn</th>
                                <th >Tên người gửi</th>
                                <th >Tên người nhận</th>
                                <th >Thời gian lập</th>
                                <th >Tổng tiền</th>
                                <th >Trạng thái</th>
                                <th ></th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentPageData.map((donHang, i) =>(
                                <tr>
                                    <td>{startIndex + i +1}</td>
                                    <td>{donHang.maVanDon}</td>
                                    <td>{donHang.thongTinNguoiGui.tenNguoiGui}</td>
                                    <td>{donHang.thongTinNguoiNhan.tenNguoiNhan}</td>
                                    <td>{donHang.thoiGianLapToString}</td>
                                    <td className='text-end'>{donHang.phiVanChuyen.tongPhi}</td>
                                    <td>{donHang.trangThai}</td>
                                    <td className='text-center'>
                                        <NavLink to = {`/chitietdh/${donHang.id}`}>
                                            <i class="fa-solid fa-circle-info" style={{color: 'black'}}></i>
                                        </NavLink>
                                        <span>&nbsp; &nbsp;</span>
                                        <NavLink to =''>
                                            <i class="fas fa-check-circle" style={{color: 'black'}}></i>
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='row' style={{marginTop:'15px', display:'flex', justifyContent: 'end', marginRight: '30px'}}>
                <Pagination style={{ border: '1px solid black', borderRadius: '5px', display: 'flex', listStyle: 'none', padding: '0', width: '270px'}}>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {pageNumbers.map((page, index) => (
                            <Pagination.Item
                                key={index}
                                active={page === currentPage}
                                onClick={() => page !== '...' && handlePageChange(page)}
                                disabled={page === '...'}
                                style={{ minWidth: '30px', textAlign: 'center' }}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
            </div>
        </div>
    );
};

export default DSDonHang;