import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { memo } from 'react';
import { getVanDonById, getVanDonByIdCustomer, listVanDon} from '../../Api/DataVanDon';
import { Pagination } from 'react-bootstrap';

const OrderList = () => {
    const userId = localStorage.getItem("userId");

    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [thongTinNguoiGui, setThongTinNguoiGui] = useState([]);

    const [isChecked, setIsChecked] = useState();
    const [checkedItems, setCheckedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;

    useEffect(() => {
        try {
            listVanDon().then((Response) => {
                // setThongTinNguoiGui(Response.data.thongTinNguoiGui);
                const filteredOrders = Response.data.filter(
                    (order) => order.thongTinNguoiGui.tenNguoiGui === localStorage.getItem("tenChuTaiKhoan")
                )
                setDanhSachDonHang(filteredOrders);
                setCheckedItems(new Array(filteredOrders.length).fill(false));
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const handleCheckedAll = () => {
        setIsChecked(!isChecked);
        setCheckedItems(new Array(danhSachDonHang.length).fill(!isChecked));
    }

    const handleCheckItem = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    }

    const totalPages = Math.ceil(danhSachDonHang.length / rowsPerPage);
    // get current page's items
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentPageData = danhSachDonHang.slice(startIndex, startIndex + rowsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const range = 2;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
                pageNumbers.push(i);
            } else if (i === currentPage - range - 1 || i === currentPage + range + 1) {
                pageNumbers.push('...');
            }
        }

        return [...new Set(pageNumbers)]; // Remove duplicates
    };

    const handleOrderDetailClick = (idOrder) => {
        localStorage.setItem('idOrder', idOrder);
    }


    return (
        <div className='custom_container' style={{ marginTop: '20px', marginLeft: '10px' }}>
            {/* <Nav /> */}
            <div className='title'>
                <h3 className='fw-bold'><i class="fa-solid fa-list"></i> Danh sách đơn hàng</h3>
            </div>
            <div className='d-flex justify-content-end' style={{width: '100%'}}>
                <Pagination style={{ border: '1px solid black', borderRadius: '5px', display: 'flex', listStyle: 'none', padding: '0'}}>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {getPageNumbers().map((page, index) => (
                        <Pagination.Item
                            key={index}
                            active={page === currentPage}
                            onClick={() => page !== '...' && handlePageChange(page)}
                            disabled={page === '...'}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
            <table className="table">
                <thead>
                    <tr className='table-info font-style'>
                        <th scope="col">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isChecked} onChange={handleCheckedAll} />
                            </div>
                        </th>
                        <th scope="col">STT</th>
                        <th scope="col">Mã đơn hàng</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Ngày tạo đơn</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>
                    </tr>
                </thead>                         
                <tbody>
                    {currentPageData.map((donHang, i) => (
                        <tr key={i}>
                            <th scope="row">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checkedItems[i]} onChange={() => handleCheckItem(i)} />
                                </div>
                            </th>
                            <td>{startIndex + i + 1}</td>
                            <td>{donHang.maVanDon}</td>
                            <td>{donHang.thongTinHangHoa.tenHang || 'Khác'}</td>
                            <td>{donHang.thoiGianLap}</td>
                            <td>{donHang.trangThai}</td>
                            <td><NavLink to={`/order-details/${donHang.id}`} onClick = {() =>handleOrderDetailClick(donHang.id)}><i class="fa-solid fa-circle-info"></i></NavLink></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(OrderList);