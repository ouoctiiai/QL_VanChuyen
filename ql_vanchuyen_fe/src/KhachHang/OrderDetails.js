import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const OrderDetails = () => {
    return (
        <div className='order-detail-container'>
           <div>
            <h3>Chi tiết đơn hàng</h3>
            <div className='p-3'>
                <h4>Mã đơn hàng</h4>
                <label>DH001</label>
            </div>
            <div className='p-3'>
                <h4>Mã đơn hàng</h4>
                <label>DH001</label>
            </div>
            <div className='p-3'>
                <h4>Mã đơn hàng</h4>
                <label>DH001</label>
            </div>
            <div className='p-3'>
                <h4>Mã đơn hàng</h4>
                <label>DH001</label>
            </div>
            <div className='p-3'>
                <h4>Mã đơn hàng</h4>
                <label>DH001</label>
            </div>
           </div>
        </div>
    );
};

export default OrderDetails;