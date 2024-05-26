import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { updateAccountCustomer, updateProfileCustomerInfo } from '../../Api/DataTaiKhoan';

const UpdateProfileCustomer = () => {

    const [banks, setBanks] = useState([]);

    const location = useLocation();
    const { taiKhoan, thongTinTaiKhoan } = location.state || {};

    const [formState, setFormState] = useState({
        sdt: taiKhoan?.sdt || null,
        email: taiKhoan?.email || null,
        soCCCD: taiKhoan?.soCCCD || '',
        diaChi: taiKhoan?.diaChi || '',
        tenNganHang: thongTinTaiKhoan?.tenNganHang || '',
        soTaiKhoan: thongTinTaiKhoan?.soTaiKhoan || ''
    });

    const encodedDiaChi = encodeURIComponent(formState.diaChi)

    useEffect(() => {
        axios.get('https://api.vietqr.io/v2/banks')
            .then((response) => {
                // http status code
                // 200: thanh cong
                // 400: bad request
                // 401, 403: unauthorized
                // 500: loi backend server
                if (response && response.status === 200) {
                    const result = response.data;
                    if (result && result.code === "00") {
                        setBanks(result.data);
                        console.log(banks);
                    }
                }
            })
            .catch((error) => {
                console.error('Không thể lấy dữ liệu từ API', error);
            });
    }, []);

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = localStorage.getItem("userId");
        if (!id) {
            console.error("User ID không được tìm thấy trong localStorage");
            return;
        }
        try {
            const response = await updateProfileCustomerInfo(id, formState.sdt, formState.email, formState.soCCCD, formState.diaChi, formState.tenNganHang, formState.soTaiKhoan);
            console.log(response.data);
            alert('Cập nhật thông tin tài khoản thành công!');
            
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            alert("Cập nhật thông tin tài khoản thất bại!");
        }

    }

    return (
        <div className='update-customer-container'>
            <div className='update-title' style={{ margin: '20px' }}>
                <h2>Chỉnh sửa thông tin khách hàng</h2>
            </div>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Số điện thoại</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text"
                                    name="sdt"
                                    value={formState.sdt}
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    placeholder="Nhập email"/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>CMND/CCCD</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text"
                                    name="soCCCD"
                                    value={formState.soCCCD}
                                    onChange={handleChange}
                                    placeholder="Nhập CMND hoặc CCCD"/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Địa chỉ</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text"
                                    name="diaChi"
                                    value={formState.diaChi}
                                    onChange={handleChange}
                                    placeholder="Nhập địa chỉ"/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Tên ngân hàng</Form.Label>
                            </Col>
                            <Col>
                                <Form.Select name="tenNganHang"
                                    value={formState.tenNganHang}
                                    onChange={handleChange}>

                                    <option>Chọn tên ngân hàng</option>
                                    {banks.map(bank => (
                                        <option key={bank.code} value={bank.code}>{bank.short_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Số tài khoản ngân hàng</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text"
                                    name="soTaiKhoan"
                                    value={formState.soTaiKhoan}
                                    onChange={handleChange}
                                    placeholder="Nhập số tài khoản ngân hàng" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <div className='d-flex justify-content-center'>
                        <Button type='submit' className='btn-create d-flex justify-content-center' style={{ width: '200px' }}>
                            Update
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProfileCustomer;