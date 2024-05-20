import React from 'react';
import { memo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './CreateOrder.scss';
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';

const CreateOrder = () => {

    const [formState, setFormState] = useState({
        loaiHangHoa: '', tenHangHoa: '',
        trongLuong: '', soLuong: ''
    });
    const [isActiveLoai, setIsActiveLoai] = useState(false);
    const [isActiveTen, setIsActiveTen] = useState(false);
    const [isActiveTrongLuong, setIsActiveTrongLuong] = useState(false);
    const [isActiveSoLuong, setIsActiveSoLuong] = useState(false);
    const handleChange = (event) => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    useState(() => {
        setIsActiveLoai(!!formState.loaiHangHoa);
        setIsActiveTen(!!formState.tenHangHoa);
        setIsActiveTrongLuong(!!formState.trongLuong);
        setIsActiveSoLuong(!!formState.soLuong);
    }, [formState.loaiHangHoa, formState.tenHangHoa, formState.trongLuong, formState.soLuong]);

    return (
        <div className='createorder_container'>
            <div className='form_create' style={{ backgroundColor: 'white' }}>
                <Form>
                    <div>
                        <h3>Thông tin hàng hoá</h3>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="loai">
                                    <Form.Label>Loại hàng hoá</Form.Label>
                                    <Form.Control className='area-input' type="text" placeholder="Nhập loại hàng hoá ở đây..." />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="tên">
                                    <Form.Label>Tên hàng hoá</Form.Label>
                                    <Form.Control className='area-input' type="text" placeholder="Nhập tên hàng hoá ở đây..." />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <FormLabel>Trọng lượng</FormLabel>
                                <Form.Select aria-label="Default select example">
                                    <option value="0.99">Dưới 1kg</option>
                                    <option value="4.99">Dưới 5kg</option>
                                    <option value="9.99">Dưới 10kg</option>
                                    <option value="49.99">Dưới 50kg</option>
                                </Form.Select>
                            </Col>
                            <Col xs={3}>
                                <Form.Group className="mb-3" controlId="tên">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control className='area-input' type="number" placeholder="Nhập số lượng ở đây..." />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <h3>Thông tin người nhận</h3>
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default memo(CreateOrder);
