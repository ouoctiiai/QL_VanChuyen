import React, { useEffect } from 'react';
import { memo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './CreateOrder.scss';

import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';
import { listPhuongXaTheoQuanHuyen, listQuanHuyenTheoTinhThanh, listTinhThanh } from '../../Api/DataDiaChi';
import { createOrder } from '../../Api/DataVanDon';

const CreateOrder = () => {

    const [formState, setFormState] = useState({
        tenNguoiGui: '', sdtNguoiGui: '', diaChiNguoiGui: '',
        tenNguoiNhan: '', sdtNguoiNhan: '', diaChiNguoiNhan: '',
        loaiHangHoa: '', tenHangHoa: '',
        trongLuong: '', soLuong: ''
    });
    // const [isActiveLoai, setIsActiveLoai] = useState(false);
    // const [isActiveTen, setIsActiveTen] = useState(false);
    // const [isActiveTrongLuong, setIsActiveTrongLuong] = useState(false);
    // const [isActiveSoLuong, setIsActiveSoLuong] = useState(false);
    const [selectedTrongLuong, setSelectTrongLuong] = useState([]);

    const [tinhNguoiGui, setTinhNguoiGui] = useState([]);
    const [quanNguoiGui, setQuanNguoiGui] = useState([]);
    const [phuongNguoiGui, setPhuongNguoiGui] = useState([]);
    const [soNhaNguoiGui, setSoNhaNguoiGui] = useState([]);
    const [selectedTinhNguoiGui, setSelectedTinhNguoiGui] = useState(0);
    const [selectedQuanNguoiGui, setSelectedQuanNguoiGui] = useState(0);
    const [selectedPhuongNguoiGui, setSelectedPhuongNguoiGui] = useState(0);

    const [tinhNguoiNhan, setTinhNguoiNhan] = useState([]);
    const [quanNguoiNhan, setQuanNguoiNhan] = useState([]);
    const [phuongNguoiNhan, setPhuongNguoiNhan] = useState([]);
    const [soNhaNguoiNhan, setSoNhaNguoiNhan] = useState([]);
    const [selectedTinhNguoiNhan, setSelectedTinhNguoiNhan] = useState(0);
    const [selectedQuanNguoiNhan, setSelectedQuanNguoiNhan] = useState(0);
    const [selectedPhuongNguoiNhan, setSelectedPhuongNguoiNhan] = useState(0);

    // const handleChange = (event) => {
    //     setFormState(prevState => ({
    //         ...prevState,
    //         [event.target.name]: event.target.value
    //     }));
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // useState(() => {
    //     setIsActiveLoai(!!formState.loaiHangHoa);
    //     setIsActiveTen(!!formState.tenHangHoa);
    //     setIsActiveTrongLuong(!!formState.trongLuong);
    //     setIsActiveSoLuong(!!formState.soLuong);
    // }, [formState.loaiHangHoa, formState.tenHangHoa, formState.trongLuong, formState.soLuong]);

    useEffect(() => {
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

    const handlePhuongNguoiGuiChange = (e) => {
        const idPhuong = e.target.value;
        setSelectedPhuongNguoiGui(idPhuong);
    };

    const handleSoNhaNguoiGuiChange = (e) => {
        setSoNhaNguoiGui(e.target.value);
    };

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

    const handlePhuongNguoiNhanChange = (e) => {
        const idPhuong = e.target.value;
        setSelectedPhuongNguoiNhan(idPhuong);
    };

    const handleSoNhaNguoiNhanChange = (e) => {
        setSoNhaNguoiNhan(e.target.value);
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

    const handleSelectedTrongLuong = (e) => {
        setSelectTrongLuong(e.target.value);
    }

    const generateRandomId = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 12; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedTinhNG = tinhNguoiGui.find(tinh => tinh.IdDiaChi === selectedTinhNguoiGui);
        const selectedQuanNG = quanNguoiGui.find(quan => quan.MaQuanHuyen === selectedQuanNguoiGui);
        const selectedPhuongNG = phuongNguoiGui.find(phuong => phuong.maPhuongXa === selectedPhuongNguoiGui);

        const selectedTinhNN = tinhNguoiNhan.find(tinh => tinh.IdDiaChi === selectedTinhNguoiNhan);
        const selectedQuanNN = quanNguoiNhan.find(quan => quan.MaQuanHuyen === selectedQuanNguoiNhan);
        const selectedPhuongNN = phuongNguoiNhan.find(phuong => phuong.maPhuongXa === selectedPhuongNguoiNhan);

        const orderData = {
            maVanDon: generateRandomId(),
            thoiGianLap: new Date(),
            loaiVanChuyen: 'Nội tỉnh',
            nguoiThanhToan: 'Người gửi',
            thongTinNguoiGui: {
                tenNguoiGui: formState.tenNguoiGui || null,
                sdtNguoiGui: formState.sdtNguoiGui || null,
                diaChiNguoiGui: soNhaNguoiGui ? `${soNhaNguoiGui}, ${selectedPhuongNG.tenPhuongXa}, ${selectedQuanNG.TenQuanHuyen}, ${selectedTinhNG.Name}` : null
            },
            thongTinNguoiNhan: {
                tenNguoiNhan: formState.tenNguoiNhan || null,
                sdtNguoiNhan: formState.sdtNguoiNhan || null,
                diaChiNguoiNhan: soNhaNguoiNhan ? `${soNhaNguoiNhan}, ${selectedPhuongNN.tenPhuongXa}, ${selectedQuanNN.TenQuanHuyen}, ${selectedTinhNN.Name}` : null
            },
            thongTinHangHoa: {
                loaiHang: formState.loaiHangHoa || null,
                tenHang: formState.tenHangHoa || null,
                trongLuong: selectedTrongLuong || null,
                soLuong: formState.soLuong || null
            }
        };
        console.log(orderData);

        try {
            const response = await createOrder(orderData).then(response => {
                if (response.status === 200) {

                    alert('Đơn hàng đã được tạo thành công!');
                } else {
                    alert('Đã có lỗi xảy ra khi tạo đơn hàng.');
                }
            })

        } catch (error) {
            console.error('Error creating order:', error);
            alert('Đã có lỗi xảy ra khi tạo đơn hàng: ' + error.message);
        }

        fetch("http://localhost:4433/vandon/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
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
                                            <Form.Control className='area-input' name='tenNguoiGui' type="text" placeholder="Nhập tên người gửi..." onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="tên">
                                            <Form.Label>Số điện thoại người gửi</Form.Label>
                                            <Form.Control className='area-input' name='sdtNguoiGui' type="number" placeholder="Nhập số điện thoại..." onChange={handleChange} />
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
                                            <Form.Select type='text' value={selectedPhuongNguoiGui} onChange={handlePhuongNguoiGuiChange}>
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
                                            <Form.Control type='text' value={soNhaNguoiGui} onChange={handleSoNhaNguoiGuiChange} name='diaChiNguoiGui' placeholder='Tên đường, Tòa nhà, Số nhà'></Form.Control>
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
                                            <Form.Control className='area-input' name='tenNguoiNhan' type="text" placeholder="Nhập tên người nhận..." onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="tên">
                                            <Form.Label>Số điện thoại người nhận</Form.Label>
                                            <Form.Control className='area-input' name='sdtNguoiNhan' type="number" placeholder="Nhập số điện thoại..." onChange={handleChange} />
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
                                            <Form.Select type='text' value={selectedPhuongNguoiNhan} onChange={handlePhuongNguoiNhanChange}>
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
                                            <Form.Control type='text' value={soNhaNguoiNhan} onChange={handleSoNhaNguoiNhanChange} name='diaChiNguoiNhan' placeholder='Tên đường, Tòa nhà, Số nhà' ></Form.Control>
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
                                            <Form.Control className='area-input' name='loaiHangHoa' type="text" placeholder="Nhập loại hàng hoá ở đây..." onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="tên">
                                            <Form.Label>Tên hàng hoá</Form.Label>
                                            <Form.Control className='area-input' name='tenHangHoa' type="text" placeholder="Nhập tên hàng hoá ở đây..." onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormLabel>Trọng lượng</FormLabel>
                                        <Form.Select aria-label="Default select example" onChange={handleSelectedTrongLuong}>
                                            <option>Chọn trọng lượng của hàng hoá</option>
                                            <option value="0.99">Dưới 1kg</option>
                                            <option value="4.99">Dưới 5kg</option>
                                            <option value="9.99">Dưới 10kg</option>
                                            <option value="49.99">Dưới 50kg</option>
                                            <option value="50">Trên 50kg</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="tên">
                                            <Form.Label>Số lượng</Form.Label>
                                            <Form.Control className='area-input' type="number" name='soLuong' placeholder="Nhập số lượng ở đây..." onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-center'>
                        <Button type='submit' className='btn-create d-flex justify-content-center' style={{ width: '200px' }} onClick={handleSubmit}>
                            Tạo đơn hàng
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default memo(CreateOrder);
