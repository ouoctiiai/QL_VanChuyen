import React, { memo, useEffect, useState } from 'react';
import { Col, Form, Row, Card } from 'react-bootstrap';
import { listTaiXe, listVanDon, listXe } from '../Api/DataVanDon';
import { listPhuongXaTheoQuanHuyen, listQuanHuyenTheoTinhThanh, listTinhThanh } from '../Api/DataDiaChi';
import Mapbox from '../Shipper/Components/Mapbox';

const TaoDonHang = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [danhSachXe, setDanhSachXe] = useState([]);
    const [danhSachTaiXe, setDanhSachTaiXe] = useState([]);
    const [loaiVanChuyen, setLoaiVanChuyen] = useState('Liên tỉnh');
    const [soDienThoai, setSoDienThoaiTaiXe] = useState([]);
    const [loaiXeChon, setLoaiXeChon] = useState([]);
    const [khoangCach, setKhoangCach] = useState(0);

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

    useEffect(() => {
        try {
            listVanDon().then((Response) => {
                setDanhSachDonHang(Response.data);
            });
            listXe().then((Response) => {
                setDanhSachXe(Response.data);
            });
            listTaiXe().then((Response) => {
                setDanhSachTaiXe(Response.data);
            });

            listTinhThanh().then((Response) => {
                setTinhNguoiGui(Response.data);
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

        if (loaiVanChuyen == 'Nội tỉnh') {
            setSelectedTinhNguoiNhan(idTinh);
            setQuanNguoiNhan([]);
            setPhuongNguoiNhan([]);

            listQuanHuyenTheoTinhThanh(idTinh).then(response => {
                setQuanNguoiNhan(response.data);
            }).catch(error => {
                console.error('Error fetching QuanHuyen data:', error);
            });
        }
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

    const handlePhuongNguoiGuiChange = (e) => {
        const idPhuong = e.target.value;
        setSelectedPhuongNguoiGui(idPhuong);
    };

    const handleSoNhaNguoiGuiChange = (e) => {
        setSoNhaNguoiGui(e.target.value);
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

    const handlePhuongNguoiNhanChange = (e) => {
        const idPhuong = e.target.value;
        setSelectedPhuongNguoiNhan(idPhuong);
    };

    const handleSoNhaNguoiNhanChange = (e) => {
        setSoNhaNguoiNhan(e.target.value);
    };

    const handleLoaiVanChuyenChange = (event) => {
        setLoaiVanChuyen(event.target.value);
    };

    const handleTaiXeChange = (event) => {
        const tenTaiXe = event.target.value;
        const taiXe = danhSachTaiXe.find(tx => tx.tenTaiXe == tenTaiXe);
        setSoDienThoaiTaiXe(taiXe ? taiXe.sdtTaiXe : '');
    };

    const handleLoaiXeChange = (event) => {
        setLoaiXeChon(event.target.value);
    };

    const getDiaChiNguoiGui = () => {
        const selectedTinh = tinhNguoiGui.find(tinh => tinh.IdDiaChi === selectedTinhNguoiGui);
        const selectedQuan = quanNguoiGui.find(quan => quan.MaQuanHuyen === selectedQuanNguoiGui);
        const selectedPhuong = phuongNguoiGui.find(phuong => phuong.maPhuongXa === selectedPhuongNguoiGui);
        
        if (selectedTinh && selectedQuan && selectedPhuong) {
            return `${soNhaNguoiGui}, ${selectedPhuong.tenPhuongXa}, ${selectedQuan.TenQuanHuyen}, ${selectedTinh.Name}`;
        } else {
            return '';
        }
    };

    const getDiaChiNguoiNhan = () => {
        const selectedTinh = tinhNguoiNhan.find(tinh => tinh.IdDiaChi === selectedTinhNguoiNhan);
        const selectedQuan = quanNguoiNhan.find(quan => quan.MaQuanHuyen === selectedQuanNguoiNhan);
        const selectedPhuong = phuongNguoiNhan.find(phuong => phuong.maPhuongXa === selectedPhuongNguoiNhan);
        
        if (selectedTinh && selectedQuan && selectedPhuong) {
            return `${soNhaNguoiNhan}, ${selectedPhuong.tenPhuongXa}, ${selectedQuan.TenQuanHuyen}, ${selectedTinh.Name}`;
        } else {
            return '';
        }
    };

    const locBienSoXe = danhSachXe
        .filter(xe => xe.loaiXe == loaiXeChon)
        .map(xe => xe.bienSo);

    const uniqueLoaiVanChuyen = Array.from(new Set(danhSachDonHang.map(donHang => donHang.loaiVanChuyen)));
    const uniqueLoaiHang = Array.from(new Set(danhSachDonHang.map(donHang => donHang.thongTinHangHoa.loaiHang)));
    const uniqueLoaiXe = Array.from(new Set(danhSachXe.map(xe => xe.loaiXe)));

    return (
        <div className='p-2'>
            <Row>
                <Row style={{marginBottom: '10px'}}>
                    <Form.Select style={{width: '300px', marginLeft:'12px'}} value={loaiVanChuyen} onChange={handleLoaiVanChuyenChange}>
                        {uniqueLoaiVanChuyen.map((donHang, index) => 
                            <option key={index} value={donHang}>{donHang}</option>
                        )}
                    </Form.Select>
                </Row>
                <Row style={{marginBottom: '10px'}}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin người gửi</Card.Title>
                                <Form>
                                    <Form.Group as={Row} className='p-2'>
                                        <Form.Label column sm="4"><h6>Tên người gửi</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className='p-2'>
                                        <Form.Label column sm="4"><h6>Số điện thoại</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Control type='number' min={1}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className='p-2'>
                                        <Form.Label Row sm="4"><h6>Địa chỉ người gửi</h6></Form.Label>
                                        <Row style={{marginLeft:'10px'}}>
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
                                        <Row style={{marginLeft:'10px'}}>
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
                                        <Row style={{marginLeft:'10px'}}>
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
                                        <Row style={{marginLeft:'10px'}}>
                                            <Form.Label column sm="4"><h6></h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='text' placeholder='Tên đường, Tòa nhà, Số nhà' value={soNhaNguoiGui} onChange={handleSoNhaNguoiGuiChange}></Form.Control>
                                            </Col>
                                        </Row>     
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin người nhận</Card.Title>
                                <Form>
                                    <Form.Group as={Row} className='p-2'>
                                        <Form.Label column sm="4"><h6>Tên người nhận</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Control type='text'></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className='p-2'>
                                        <Form.Label column sm="4"><h6>Số điện thoại</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Control type='number' min={1}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className='p-2'>
                                        <Form.Label as={Row}><h6>Địa chỉ người nhận</h6></Form.Label>
                                        <Row style={{marginLeft:'10px'}}>
                                            <Form.Label column sm="4"><h6>Tỉnh Thành</h6></Form.Label>
                                            <Col sm="8">
                                                {loaiVanChuyen == 'Liên tỉnh' && (
                                                    <Form.Select type='text' value={selectedTinhNguoiNhan} onChange={handleTinhNguoiNhanChange}>
                                                        <option value={0}>Tỉnh Thành</option>
                                                        {tinhNguoiNhan.map((tinh) => (
                                                            <option key={tinh.IdDiaChi} value={tinh.IdDiaChi}>{tinh.Name}</option>
                                                        ))}
                                                    </Form.Select>
                                                )}
                                                {loaiVanChuyen == 'Nội tỉnh' && (
                                                    <Form.Select type='text' value={selectedTinhNguoiNhan} onChange={handleTinhNguoiNhanChange}>
                                                        <option value={0}>Tỉnh Thành</option>
                                                        {tinhNguoiNhan.map((tinh) => (
                                                            <option key={tinh.IdDiaChi} value={tinh.IdDiaChi} disabled>{tinh.Name}</option>
                                                        ))}
                                                    </Form.Select>
                                                )}
                                            </Col>
                                        </Row> 
                                        <Row style={{marginLeft:'10px'}}>
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
                                        <Row style={{marginLeft:'10px'}}>
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
                                        <Row style={{marginLeft:'10px'}}>
                                            <Form.Label column sm="4"><h6></h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='text' placeholder='Tên đường, Tòa nhà, Số nhà' value={soNhaNguoiNhan} onChange={handleSoNhaNguoiNhanChange}></Form.Control>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginBottom: '10px'}}>
                    <Card style={{marginLeft:'12px', width:'945px'}}>
                        <Card.Body>
                            <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin hàng hóa</Card.Title>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="3"><h6>Loại hàng</h6></Form.Label>
                                            <Col sm="9">
                                                <Form.Select>
                                                    <option>Chọn loại hàng</option>
                                                    {uniqueLoaiHang.map((donHang, index) => 
                                                        <option key={index} value={donHang}>{donHang}</option>
                                                    )}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="3"><h6>Tên hàng</h6></Form.Label>
                                            <Col sm="9">
                                                <Form.Control type='text'></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="3"><h6>Số lượng</h6></Form.Label>
                                            <Col sm="9">
                                                <Form.Control type='number' min={1}></Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="3"><h6>Trọng lượng</h6></Form.Label>
                                            <Col sm="9">
                                                <Form.Select>
                                                    <option value="0.99">Dưới 1kg</option>
                                                    <option value="4.99">Dưới 5kg</option>
                                                    <option value="9.99">Dưới 10kg</option>
                                                    <option value="49.99">Dưới 50kg</option>
                                                    <option value="50.11">Trên 50kg</option>
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>                   
                                    </Col>
                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="3"><h6>Kích cỡ</h6></Form.Label>
                                            <Col sm="9">
                                                <Form.Group as={Row} className='p-2'>
                                                    <Form.Label column sm="4"><h6>Chiều dài</h6></Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type='number' min={1} value="chieuDai"></Form.Control>
                                                    </Col>                                                        
                                                </Form.Group>
                                                <Form.Group as={Row} className='p-2'>
                                                    <Form.Label column sm="4"><h6>Chiều rộng</h6></Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control type='number' min={1} value="chieuRong"></Form.Control>
                                                    </Col>
                                                </Form.Group>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        {loaiVanChuyen == 'Liên tỉnh' && (
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Phí cố định</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={30000} disabled></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        )}

                                        {loaiVanChuyen == 'Nội tỉnh' && (
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Phí cố định</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={10000} disabled></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        )}
                                    </Col>

                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="5"><h6>Phí VAT</h6></Form.Label>
                                            <Col sm="7">
                                                <Form.Control type='number' disabled></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="5"><h6>Tiền cọc</h6></Form.Label>
                                            <Col sm="7">
                                                <Form.Control type='number' min={1}></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="5"><h6>Phí nâng</h6></Form.Label>
                                            <Col sm="7">
                                                <Form.Control type='number' min={1}></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="5"><h6>Phí hạ</h6></Form.Label>
                                            <Col sm="7">
                                                <Form.Control type='number' min={1}></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="5"><h6>Thưởng shipper</h6></Form.Label>
                                            <Col sm="7">
                                                <Form.Control type='number' min={1}></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="5"><h6>Phí khác</h6></Form.Label>
                                            <Col sm="7">
                                                <Form.Control type='number' min={1}></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>

                                    
                                    <Col>
                                        {loaiVanChuyen == 'Nội tỉnh' && (
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Khoảng cách</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' min={1} disabled value={khoangCach}></Form.Control>
                                                    <div style={{display: 'none'}}>
                                                        <Mapbox from={getDiaChiNguoiGui()} to={getDiaChiNguoiNhan()} setKC={setKhoangCach} disabled/>
                                                    </div>
                                                </Col>
                                            </Form.Group>
                                        )}
                                        {loaiVanChuyen == 'Liên tỉnh' && (
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Khoảng cách</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' min={1} disabled></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        )}
                                    </Col>

                                    <Col>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="5"><h6>Tổng phí</h6></Form.Label>
                                            <Col sm="7">
                                                <Form.Control type='number' min={1} disabled></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>

                {loaiVanChuyen == 'Liên tỉnh' && (
                    <Row style={{marginBottom: '10px'}}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin tài xế</Card.Title>
                                    <Form>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Tên tài xế</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Select onChange={handleTaiXeChange}>
                                                    <option>Chọn tài xế</option>
                                                    {danhSachTaiXe.map((taiXe, index) => 
                                                        <option key={index} value={taiXe.tenTaiXe}>{taiXe.tenTaiXe}</option>
                                                    )}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Số điện thoại</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='number' value={soDienThoai} disabled></Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin xe</Card.Title>
                                    <Form>
                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Loại xe</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Select onChange={handleLoaiXeChange}>
                                                    <option>Chọn loại xe</option>
                                                    {uniqueLoaiXe.map((loaiXe, index) => 
                                                        <option key={index} value={loaiXe}>{loaiXe}</option>
                                                    )}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Biển số xe</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Select>
                                                    {locBienSoXe.map((bienSo, index) => 
                                                        <option key={index} value={bienSo}>{bienSo}</option>
                                                    )}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                
            </Row>
        </div>
    );
};

export default memo(TaoDonHang);