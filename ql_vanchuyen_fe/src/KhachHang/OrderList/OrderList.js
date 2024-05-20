import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { memo } from 'react';
import { listVanDon } from '../../Api/DataVanDon';

const OrderList = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [isChecked, setIsChecked] = useState();
    const [checkedItems, setCheckedItems] = useState([]); 

    useEffect(() => {
        try{
            listVanDon().then((Response) =>{
                setDanhSachDonHang(Response.data);
            })
        }catch(error){
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

    return (
        <div className='custom_container'>
            {/* <Nav /> */}
            <div className='title'>
                
                <h3 className='fw-bold'><i class="fa-solid fa-list"></i> Danh sách đơn hàng</h3>
            </div>
            <table className="table">
                <thead>
                    <tr className='table-info font-style'>
                        <th scope="col">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isChecked} onChange={handleCheckedAll}/>
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
                    {danhSachDonHang.map((donHang, i) => (
                        <tr>
                        <th scope="row">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checkedItems[i]} onChange={() => handleCheckItem(i)}/>
                            </div>
                        </th>
                        <td>{i+1}</td>
                        <td>{donHang.maVanDon}</td>
                        <td>{donHang.thongTinHangHoa.tenHang || 'Khác'}</td>
                        <td>{donHang.thoiGianLap}</td>
                        <td>{donHang.trangThai}</td>
                        <td><NavLink to={`/order-details/${donHang.id}`}><i class="fa-solid fa-circle-info"></i></NavLink></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(OrderList);