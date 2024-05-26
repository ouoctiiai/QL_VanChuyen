import React, { useEffect } from 'react';
import { memo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './CreateOrder.scss';

import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';
import { listPhuongXaTheoQuanHuyen, listQuanHuyenTheoTinhThanh, listTinhThanh } from '../../Api/DataDiaChi';
import { createOrder, listVanDon, tinhPhiVat, tinhTongPhi } from '../../Api/DataVanDon';
import Mapbox from '../../Shipper/Components/Mapbox';
import { getTaiKhoanById } from '../../Api/DataTaiKhoan';

const CreateOrder = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);

    const [khoangCach, setKhoangCach] = useState(0);
    const [phiCoDinh, setPhiCoDinh] = useState(10000);
    const [phiThuong, setPhiThuong] = useState(0);
    const [phiVAT, setPhiVAT] = useState(3000);
    const [tongPhi, setTongPhi] = useState([]);
    const [trongLuong, setTrongLuong] = useState(0.99);
    const [soLuong, setSoLuong] = useState(1);
    const [loaiHang, setLoaiHang] = useState('Khác');
    const [tenHang, setTenHang] = useState('');


    const [selectedTrongLuong, setSelectTrongLuong] = useState([]);

    const [tenNguoiGui, setTenNguoiGui] = useState('');
    const [sdtNguoiGui, setSdtNguoiGui] = useState('');
    const [tinhNguoiGui, setTinhNguoiGui] = useState([]);
    const [quanNguoiGui, setQuanNguoiGui] = useState([]);
    const [phuongNguoiGui, setPhuongNguoiGui] = useState([]);
    const [soNhaNguoiGui, setSoNhaNguoiGui] = useState([]);
    const [selectedTinhNguoiGui, setSelectedTinhNguoiGui] = useState(0);
    const [selectedQuanNguoiGui, setSelectedQuanNguoiGui] = useState(0);
    const [selectedPhuongNguoiGui, setSelectedPhuongNguoiGui] = useState(0);

    const [tenNguoiNhan, setTenNguoiNhan] = useState('');
    const [sdtNguoiNhan, setSdtNguoiNhan] = useState('');
    const [tinhNguoiNhan, setTinhNguoiNhan] = useState([]);
    const [quanNguoiNhan, setQuanNguoiNhan] = useState([]);
    const [phuongNguoiNhan, setPhuongNguoiNhan] = useState([]);
    const [soNhaNguoiNhan, setSoNhaNguoiNhan] = useState([]);
    const [selectedTinhNguoiNhan, setSelectedTinhNguoiNhan] = useState(0);
    const [selectedQuanNguoiNhan, setSelectedQuanNguoiNhan] = useState(0);
    const [selectedPhuongNguoiNhan, setSelectedPhuongNguoiNhan] = useState(0);

    const [taiKhoan, setTaiKhoan] = useState([]);

    useEffect(() => {
        try {
            listVanDon().then((Response) => {
                setDanhSachDonHang(Response.data);
            })
            listTinhThanh().then((Response) => {
                setTinhNguoiGui(Response.data);
            });

            listTinhThanh().then((Response) => {
                setTinhNguoiNhan(Response.data);
            });

            try {
                const id = localStorage.getItem("userId");
                getTaiKhoanById(id).then((Response) => {
                    setTaiKhoan(Response.data);
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        try {
            tinhPhiVat(phiCoDinh, 0, 0, 0, 0).then((response) => {
                setPhiVAT(response.data);
            })
        } catch (error) {
            console.error('Lỗi khi tính phí VAT:', error);
        }
    }, [phiCoDinh, 0, 0, 0, 0]);

    useEffect(() => {
        try {
            tinhTongPhi(phiCoDinh, phiVAT, 0, 0, 0, phiThuong, 0, khoangCach, trongLuong, 0, 0, loaiHang, "Nội tỉnh").then((response) => {
                setTongPhi(response.data);
            })
        } catch (error) {
            console.error('Lỗi khi tính tổng phí:', error);
        }
    }, [phiCoDinh, phiVAT, 0, 0, 0, phiThuong, 0, khoangCach, trongLuong, 0, 0, loaiHang, "Nội tỉnh"]);


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

        setSelectedTinhNguoiNhan(idTinh);
        setQuanNguoiNhan([]);
        setPhuongNguoiNhan([]);

        listQuanHuyenTheoTinhThanh(idTinh).then(response => {
            setQuanNguoiNhan(response.data);
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

    // const handleSelectedTrongLuong = (e) => {
    //     setSelectTrongLuong(e.target.value);
    // }

    const handlePhiThuong = (e) => {
        setPhiThuong(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const vanDonMoi = {
            loaiVanChuyen: "Nội tỉnh",
            thongTinNguoiGui: {
                tenNguoiGui: taiKhoan.tenChuTaiKhoan,
                sdtNguoiGui: taiKhoan.sdt,
                diaChiNguoiGui: getDiaChiNguoiGui(),
            },
            thongTinNguoiNhan: {
                tenNguoiNhan: e.target.elements.tenNguoiNhan.value,
                sdtNguoiNhan: e.target.elements.sdtNguoiNhan.value,
                diaChiNguoiNhan: getDiaChiNguoiNhan(),
            },
            thongTinHangHoa: {
                loaiHang: loaiHang,
                tenHang: e.target.elements.tenHangHoa.value,
                trongLuong: parseFloat(trongLuong),
                soLuong: parseInt(soLuong)
            },
            khoangCach: parseFloat(khoangCach),
            phiVanChuyen: {
                phiCoDinh: parseInt(phiCoDinh),
                vat: parseInt(phiVAT),
                thuongShipper: parseInt(e.target.elements.phiThuong.value),
                tongPhi: parseInt(tongPhi)
            }
        }; 
        console.log(vanDonMoi);

        createOrder(vanDonMoi)
            .then(Response => {
                alert("Đơn hàng được thêm thành công!");
            })
            .catch(error => {
                console.error("Có lỗi xảy ra:", error);
                alert("Thêm đơn hàng thất bại!");
            });
    };

    const uniqueLoaiHang = Array.from(new Set(danhSachDonHang.map(donHang => donHang.thongTinHangHoa.loaiHang)));


    return (
        <div className='createorder_container'>
            <div className='form_create' style={{ backgroundColor: 'white' }}>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <div style={{ margin: '5px', backgroundColor: '#d1efff', padding: '10px', borderRadius: '10px' }}>
                                <h3>Thông tin người gửi</h3>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tên người gửi</Form.Label>
                                            <Form.Control className='area-input' value={taiKhoan.tenChuTaiKhoan} name='tenNguoiGui' type="text" disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Số điện thoại người gửi</Form.Label>
                                            <Form.Control className='area-input' value={taiKhoan.sdt} name='sdtNguoiGui' type="number" disabled />
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
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tên người nhận</Form.Label>
                                            <Form.Control className='area-input' name='tenNguoiNhan' type="text" placeholder="Nhập tên người nhận..." />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Số điện thoại người nhận</Form.Label>
                                            <Form.Control className='area-input' name='sdtNguoiNhan' type="number" placeholder="Nhập số điện thoại..." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Row} className='p-2'>
                                    <Form.Label as={Row}><h6>Địa chỉ người nhận</h6></Form.Label>
                                    <Row style={{ marginLeft: '10px' }}>
                                        <Form.Label column sm="4"><h6>Tỉnh Thành</h6></Form.Label>
                                        <Col sm="8">
                                            <Form.Select type='text' value={selectedTinhNguoiNhan} onChange={handleTinhNguoiNhanChange} disabled>
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
                                        <Form.Group className="mb-3">
                                            <Form.Label>Loại hàng hoá</Form.Label>
                                            <Form.Select value={loaiHang} onChange={(e) => setLoaiHang(e.target.value)}>
                                                {uniqueLoaiHang.map((loaiHang, index) =>
                                                    <option key={index} value={loaiHang}>{loaiHang}</option>
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Tên hàng hoá</Form.Label>
                                            <Form.Control className='area-input' name='tenHangHoa' type="text" placeholder="Nhập tên hàng hoá ở đây..." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormLabel>Trọng lượng</FormLabel>
                                        <Form.Select aria-label="Default select example" value={trongLuong} onChange={(e)=>setTrongLuong(e.target.value)}>
                                            <option>Chọn trọng lượng của hàng hoá</option>
                                            <option value="0.99">Dưới 1kg</option>
                                            <option value="4.99">Dưới 5kg</option>
                                            <option value="9.99">Dưới 10kg</option>
                                            <option value="49.99">Dưới 50kg</option>
                                            <option value="50">Trên 50kg</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ margin: '5px', backgroundColor: '#d1efff', padding: '10px', borderRadius: '10px' }}>
                                <h3>Tổng chi phí: {tongPhi}</h3>
                                <Row>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Khoảng cách</Form.Label>
                                            <Form.Control type='number' min={1} disabled value={khoangCach}></Form.Control>
                                            <div style={{ display: 'none' }}>
                                                <Mapbox from={getDiaChiNguoiGui()} to={getDiaChiNguoiNhan()} setKC={setKhoangCach} disabled />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Phí cố định</Form.Label>
                                            <Form.Control disabled readOnly className='area-input' value={phiCoDinh} name='phiCoDinh' type="text" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Phí VAT</Form.Label>
                                            <Form.Control disabled readOnly className='area-input' value={phiVAT} name='phiVAT' type="text" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Phí thưởng Shipper</Form.Label>
                                            <Form.Control className='area-input' name='phiThuong' type="money" placeholder="Tiền tip cho shipper (không bắt buộc)" onChange={handlePhiThuong}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-center'>
                        <Button type='submit' className='btn-create d-flex justify-content-center' style={{ width: '200px' }} >
                            Tạo đơn hàng
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default memo(CreateOrder);
