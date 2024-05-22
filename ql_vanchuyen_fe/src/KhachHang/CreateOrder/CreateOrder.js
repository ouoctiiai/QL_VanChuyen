import React, { useEffect } from 'react';
import { memo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './CreateOrder.scss';

import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';
import { listPhuongXaTheoQuanHuyen, listQuanHuyenTheoTinhThanh, listTinhThanh } from '../../Api/DataDiaChi';

const CreateOrder = () => {

    const [formState, setFormState] = useState({
        loaiHangHoa: '', tenHangHoa: '',
        trongLuong: '', soLuong: ''
    });
    // const [isActiveLoai, setIsActiveLoai] = useState(false);
    // const [isActiveTen, setIsActiveTen] = useState(false);
    // const [isActiveTrongLuong, setIsActiveTrongLuong] = useState(false);
    // const [isActiveSoLuong, setIsActiveSoLuong] = useState(false);

    const [tinhNguoiGui, setTinhNguoiGui] = useState([]);
    const [quanNguoiGui, setQuanNguoiGui] = useState([]);
    const [phuongNguoiGui, setPhuongNguoiGui] = useState([]);
    const [selectedTinhNguoiGui, setSelectedTinhNguoiGui] = useState(0);
    const [selectedQuanNguoiGui, setSelectedQuanNguoiGui] = useState(0);

    const [tinhNguoiNhan, setTinhNguoiNhan] = useState([]);
    const [quanNguoiNhan, setQuanNguoiNhan] = useState([]);
    const [phuongNguoiNhan, setPhuongNguoiNhan] = useState([]);
    const [selectedTinhNguoiNhan, setSelectedTinhNguoiNhan] = useState(0);
    const [selectedQuanNguoiNhan, setSelectedQuanNguoiNhan] = useState(0);

    // const handleChange = (event) => {
    //     setFormState(prevState => ({
    //         ...prevState,
    //         [event.target.name]: event.target.value
    //     }));
    // }

    // useState(() => {
    //     setIsActiveLoai(!!formState.loaiHangHoa);
    //     setIsActiveTen(!!formState.tenHangHoa);
    //     setIsActiveTrongLuong(!!formState.trongLuong);
    //     setIsActiveSoLuong(!!formState.soLuong);
    // }, [formState.loaiHangHoa, formState.tenHangHoa, formState.trongLuong, formState.soLuong]);

    useEffect(() =>{
        try {
            listTinhThanh().then((Response) => {
                setTinhNguoiGui(Response.data);
            });

            listTinhThanh().then((Response) => {
                setTinhNguoiNhan(Response.data);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const handleTinhNguoiGuiChange = (e) => {
        const idTinh = e.target.value;
        setSelectedTinhNguoiGui(idTinh);
        setQuanNguoiGui([]);
        setPhuongNguoiGui([]);

        listQuanHuyenTheoTinhThanh(idTinh).then(response => {
            setQuanNguoiGui(response.data);
        }).catch(error => {
            console.error('Error fetching QuanHuyen data:', error);
        });
    };

    const handleQuanNguoiGuiChange = (e) => {
        const idQuan = e.target.value;
        setSelectedQuanNguoiGui(idQuan);
        setPhuongNguoiGui([]);

        listPhuongXaTheoQuanHuyen(idQuan).then(response => {
            setPhuongNguoiGui(response.data);
        }).catch(error => {
            console.error('Error fetching PhuongXa data:', error);
        });
    };

    const handleTinhNguoiNhanChange = (e) => {
        const idTinh = e.target.value;
        setSelectedTinhNguoiNhan(idTinh);
        setQuanNguoiNhan([]);
        setPhuongNguoiNhan([]);

        listQuanHuyenTheoTinhThanh(idTinh).then(response => {
            setQuanNguoiNhan(response.data);
        }).catch(error => {
            console.error('Error fetching quan huyen data:', error);
        });
    };

    const handleQuanNguoiNhanChange = (e) => {
        const idQuan = e.target.value;
        setSelectedQuanNguoiNhan(idQuan);
        setPhuongNguoiNhan([]);

        listPhuongXaTheoQuanHuyen(idQuan).then(response => {
            setPhuongNguoiNhan(response.data);
        }).catch(error => {
            console.error('Error fetching phuong xa data:', error);
        });
    };



    return (
        <div className='createorder_container'>
            <div className='form_create' style={{ backgroundColor: 'white' }}>
                <Form>
                    <Row>
                        <Col>
                            <div style={{ margin: '5px', backgroundColor: '#d1efff', padding: '10px', borderRadius: '10px' }}>
                                <h3>Thông tin người gửi</h3>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="loai">
                                            <Form.Label>Tên người gửi</Form.Label>
                                            <Form.Control className='area-input' type="text" placeholder="Nhập tên người gửi..." />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="tên">
                                            <Form.Label>Số điện thoại người gửi</Form.Label>
                                            <Form.Control className='area-input' type="number" placeholder="Nhập số điện thoại..." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Row} className='p-2'>
                                    <Form.Label Row sm="4"><h6>Địa chỉ người gửi</h6></Form.Label>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6>Tỉnh Thành</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Select type='text' value={selectedTinhNguoiGui} onChange={handleTinhNguoiGuiChange}>
                                                <option value={0}>Tỉnh Thành</option>
                                                {tinhNguoiGui.map((tinh) => (
                                                    <option key={tinh.IdDiaChi} value={tinh.IdDiaChi}>{tinh.Name}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6>Quận Huyện</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Select type='text' value={selectedQuanNguoiGui} onChange={handleQuanNguoiGuiChange}>
                                                <option value={0}>Quận Huyện</option>
                                                {quanNguoiGui.map((quan) => (
                                                    <option key={quan.MaQuanHuyen} value={quan.MaQuanHuyen}>{quan.TenQuanHuyen}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6>Phường Xã</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Select type='text'>
                                                <option value={0}>Phường Xã</option>
                                                {phuongNguoiGui.map((phuong) => (
                                                    <option key={phuong.maPhuongXa} value={phuong.maPhuongXa}>{phuong.tenPhuongXa}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6></h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Control type='text' placeholder='Tên đường, Tòa nhà, Số nhà'></Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ margin: '5px', backgroundColor: '#d1efff', padding: '10px', borderRadius: '10px' }}>
                                <h3>Thông tin người nhận</h3>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="loai">
                                            <Form.Label>Tên người nhận</Form.Label>
                                            <Form.Control className='area-input' type="text" placeholder="Nhập tên người nhận..." />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="tên">
                                            <Form.Label>Số điện thoại người nhận</Form.Label>
                                            <Form.Control className='area-input' type="number" placeholder="Nhập số điện thoại..." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Row} className='p-2'>
                                    <Form.Label as={Row}><h6>Địa chỉ người nhận</h6></Form.Label>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6>Tỉnh Thành</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Select type='text' value={selectedTinhNguoiNhan} onChange={handleTinhNguoiNhanChange}>
                                                <option value={0}>Tỉnh Thành</option>
                                                {tinhNguoiNhan.map((tinh) => (
                                                    <option key={tinh.IdDiaChi} value={tinh.IdDiaChi}>{tinh.Name}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6>Quận Huyện</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Select type='text' value={selectedQuanNguoiNhan} onChange={handleQuanNguoiNhanChange}>
                                                <option value={0}>Quận Huyện</option>
                                                {quanNguoiNhan.map((quan) => (
                                                    <option key={quan.MaQuanHuyen} value={quan.MaQuanHuyen}>{quan.TenQuanHuyen}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6>Phường Xã</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Select type='text'>
                                                <option value={0}>Phường Xã</option>
                                                {phuongNguoiNhan.map((phuong) => (
                                                    <option key={phuong.maPhuongXa} value={phuong.maPhuongXa}>{phuong.tenPhuongXa}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6></h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Control type='text' placeholder='Tên đường, Tòa nhà, Số nhà'></Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ margin: '5px', backgroundColor: '#d1efff', padding: '10px', borderRadius: '10px' }}>
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
                                    <Col>
                                        <FormLabel>Trọng lượng</FormLabel>
                                        <Form.Select aria-label="Default select example">
                                            <option value="0.99">Dưới 1kg</option>
                                            <option value="4.99">Dưới 5kg</option>
                                            <option value="9.99">Dưới 10kg</option>
                                            <option value="49.99">Dưới 50kg</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="tên">
                                            <Form.Label>Số lượng</Form.Label>
                                            <Form.Control className='area-input' type="number" placeholder="Nhập số lượng ở đây..." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-center'>
                        <Button className='btn-create d-flex justify-content-center' style={{ width: '200px' }}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default memo(CreateOrder);
