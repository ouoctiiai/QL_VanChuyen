import React, { memo, useEffect, useState } from 'react';
import { Col, Form, Row, Card, Button, NavLink } from 'react-bootstrap';
import { listTaiXe, listVanDon, listXe, themDonHang, tinhKhoangCachLienTinh, tinhPhiVat, tinhTongPhi } from '../Api/DataVanDon';
import { listPhuongXaTheoQuanHuyen, listQuanHuyenTheoTinhThanh, listTinhThanh, dsTinhDonNoiTinh } from '../Api/DataDiaChi';
import Mapbox from '../Shipper/Components/Mapbox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const TaoDonHang = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [loaiVanChuyen, setLoaiVanChuyen] = useState('Liên tỉnh');
    const [khoangCach, setKhoangCach] = useState(0);

    const [danhSachTaiXe, setDanhSachTaiXe] = useState([]);
    const [maTaiXe, setMaTaiXe] = useState([]);
    const [tenTaiXe, setTenTaiXe] = useState('');
    const [sdtTaiXe, setSoDienThoaiTaiXe] = useState([]);

    const [danhSachXe, setDanhSachXe] = useState([]);    
    const [loaiXeChon, setLoaiXeChon] = useState('');
    const [bienSo, setBienSo] = useState('');

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

    const [phiCoDinh, setPhiCoDinh] = useState(0);
    const [phiCoc, setPhiCoc] = useState(0);
    const [phiNang, setPhiNang] = useState(0);
    const [phiHa, setPhiHa] = useState(0);
    const [phiThuong, setPhiThuong] = useState(0);
    const [phiKhac, setPhiKhac] = useState(0);
    const [phiVAT, setPhiVAT] = useState(3000);
    const [tongPhi, setTongPhi] = useState([]);

    const [loaiHang, setLoaiHang] = useState('Khác');
    const [tenHang, setTenHang] = useState('');
    const [soLuong, setSoLuong] = useState (1);
    const [chieuDai, setChieuDai] = useState (0);
    const [chieuRong, setChieuRong] = useState (0);
    const [khoiLuong, setKhoiLuong] = useState(0.99);

    const navigate = useHistory();

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

            if (loaiVanChuyen === "Liên tỉnh") {
                listTinhThanh().then((response) => {
                    setTinhNguoiGui(response.data);
                    setTinhNguoiNhan(response.data);
                });
            } else if (loaiVanChuyen === "Nội tỉnh"){
                dsTinhDonNoiTinh().then((response) => {
                    setTinhNguoiGui(response.data);
                    setTinhNguoiNhan(response.data);
                });
            }

            if (loaiVanChuyen === 'Liên tỉnh') {
                const dc1 = getTinhNguoiGui();
                const dc2 = getTinhNguoiNhan();
                
                setPhiCoDinh(30000);
                tinhKhoangCachLienTinh(dc1, dc2).then(response => {
                  setKhoangCach(response.data.toFixed(2));
                })
                .catch(error => {
                  console.error('Lỗi khi tính khoảng cách:', error);
                });
            }
            else{
                setPhiCoDinh(10000);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [loaiVanChuyen, selectedTinhNguoiGui, selectedTinhNguoiNhan]);

    useEffect(() => {
        try {
            tinhPhiVat(phiCoDinh, phiCoc, phiNang, phiHa, phiKhac).then((response) =>{
                setPhiVAT(response.data);
            })     
        } catch (error) {
            console.error('Lỗi khi tính phí VAT:', error);
        }
    }, [phiCoDinh, phiCoc, phiNang, phiHa, phiKhac]);

    useEffect(() => {
        try {
            tinhTongPhi(phiCoDinh, phiVAT, phiCoc, phiNang, phiHa, phiThuong, phiKhac, khoangCach, khoiLuong, chieuDai, chieuRong, loaiHang, loaiVanChuyen).then((response) => {
                setTongPhi(response.data);
            })      
        } catch (error) {
            console.error('Lỗi khi tính tổng phí:', error);
        }
    }, [phiCoDinh, phiVAT, phiCoc, phiNang, phiHa, phiThuong, phiKhac, khoangCach, khoiLuong, chieuDai, chieuRong, loaiHang, loaiVanChuyen]);


    const handleChangeLoaiVanChuyen = (event) => {
        setLoaiVanChuyen(event.target.value);
        const selectedLoaiVanChuyen = event.target.value;
        if (selectedLoaiVanChuyen === "Liên tỉnh") {
            listTinhThanh().then((response) => {
                setTinhNguoiGui(response.data);
            });
        } else if (selectedLoaiVanChuyen === "Nội tỉnh"){
            dsTinhDonNoiTinh().then((response) => {
                setTinhNguoiGui(response.data);
            });
        }
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

        if (loaiVanChuyen === 'Nội tỉnh') {
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

    // const handlePhuongNguoiGuiChange = (e) => {
    //     const idPhuong = e.target.value;
    //     setSelectedPhuongNguoiGui(idPhuong);
    // };

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

    // const handlePhuongNguoiNhanChange = (e) => {
    //     const idPhuong = e.target.value;
    //     setSelectedPhuongNguoiNhan(idPhuong);
    // };

    const handleTaiXeChange = (event) => {
        const taiXe = danhSachTaiXe.find(tx => tx.tenTaiXe === event.target.value);  
        setTenTaiXe(event.target.value)     
        setSoDienThoaiTaiXe(taiXe ? taiXe.sdtTaiXe : '');
        setMaTaiXe(taiXe ? taiXe.maTaiXe : '');
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

    const formatTenTinh = (tenTinh) => {
        if (tenTinh === "Thành phố Hồ Chí Minh") {
            return tenTinh.replace("Thành phố", "TP")
        }else if(tenTinh == "Thành phố Hà Nội" || tenTinh === "Thành phố Cần Thơ"){
            return tenTinh.replace("Thành phố ", "");
        } 
        else {
            return tenTinh.replace("Tỉnh ", "");
        }
    };
    
    const getTinhNguoiGui = () => {
        const selectedTinh = tinhNguoiGui.find(tinh => tinh.IdDiaChi === selectedTinhNguoiGui);
        if(selectedTinh){
            return formatTenTinh(selectedTinh.Name);
        }
        else{
            return '';
        }
    };
    
    const getTinhNguoiNhan = () => {
        const selectedTinh = tinhNguoiNhan.find(tinh => tinh.IdDiaChi === selectedTinhNguoiNhan);
        if(selectedTinh){
            return formatTenTinh(selectedTinh.Name);
        }
        else{
            return '';
        }
    };

    const locBienSoXe = danhSachXe
        .filter(xe => xe.loaiXe == loaiXeChon)
        .map(xe => xe.bienSo);

    const handleSubmit = (e) => {
        e.preventDefault();

        const vanDonMoi = {
            loaiVanChuyen: loaiVanChuyen,
            thongTinNguoiGui: {
                tenNguoiGui: tenNguoiGui,
                sdtNguoiGui: sdtNguoiGui,
                diaChiNguoiGui: getDiaChiNguoiGui(),
            },
            thongTinNguoiNhan: {
                tenNguoiNhan: tenNguoiNhan,
                sdtNguoiNhan: sdtNguoiNhan,
                diaChiNguoiNhan: getDiaChiNguoiNhan(),
            },
            thongTinTaiXe: loaiVanChuyen === "Liên tỉnh" ? {
                maTaiXe: maTaiXe,
                tenTaiXe: tenTaiXe,
                sdtTaiXe: sdtTaiXe
            } : null,
            thongTinXe: loaiVanChuyen === "Liên tỉnh" ? {
                bienSo: bienSo,
                loaiXe: loaiXeChon,
            } : null,
            thongTinHangHoa: {
                loaiHang: loaiHang,
                tenHang: tenHang,
                trongLuong: parseFloat(khoiLuong),
                kichCo: loaiVanChuyen === "Liên tỉnh" ? { dai: parseFloat(chieuDai), rong: parseFloat(chieuRong) } : null,
                soLuong: parseInt(soLuong)
            },
            diemXuatPhat: loaiVanChuyen === "Liên tỉnh" ? getTinhNguoiGui() : null,
            diemDen: loaiVanChuyen === "Liên tỉnh" ? getTinhNguoiNhan() : null,
            tuyenDuong: loaiVanChuyen === "Liên tỉnh" ? { khoangCach: parseFloat(khoangCach) } : null,
            tinh: loaiVanChuyen === "Nội tỉnh" ? getTinhNguoiGui() : null,
            khoangCach: loaiVanChuyen === "Nội tỉnh" ? parseFloat(khoangCach) : null,
            phiVanChuyen: {
                phiCoDinh: parseInt(phiCoDinh),
                vat: parseInt(phiVAT),
                phiNang: parseInt(phiNang),
                phiHa: parseInt(phiHa),
                phiCoc: parseInt(phiCoc),
                thuongShipper: parseInt(phiThuong),
                phiKhac : parseInt(phiKhac),
                tongPhi: parseInt(tongPhi)
            },
        };

        themDonHang(vanDonMoi)
            .then(Response => {
                alert("Đơn hàng được thêm thành công!");
                navigate.replace('/dsdonhang');
            })
            .catch(error => {
                console.error("Có lỗi xảy ra:", error);
                alert("Thêm đơn hàng thất bại!");
            });
    };    
    const uniqueLoaiVanChuyen = Array.from(new Set(danhSachDonHang.map(donHang => donHang.loaiVanChuyen)));
    const uniqueLoaiHang = Array.from(new Set(danhSachDonHang.map(donHang => donHang.thongTinHangHoa.loaiHang)));
    const uniqueLoaiXe = Array.from(new Set(danhSachXe.map(xe => xe.loaiXe)));

    return (
        <div className='p-2'>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Row style={{marginBottom: '10px'}}>
                        <Form.Select style={{width: '300px', marginLeft:'12px'}} value={loaiVanChuyen} onChange={handleChangeLoaiVanChuyen}>
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
                                    <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Tên người gửi</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='text' value={tenNguoiGui} onChange={(e) => setTenNguoiGui(e.target.value)}></Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Số điện thoại</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='number' min={1} value={sdtNguoiGui} onChange={(e) => setSdtNguoiGui(e.target.value)}></Form.Control>
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
                                                    <Form.Select type='text' value={selectedPhuongNguoiGui} onChange={(e) => setSelectedPhuongNguoiGui(e.target.value)}>
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
                                                    <Form.Control type='text' placeholder='Tên đường, Tòa nhà, Số nhà' value={soNhaNguoiGui} onChange={(e) => setSoNhaNguoiGui(e.target.value)}></Form.Control>
                                                </Col>
                                            </Row>    
                                        </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin người nhận</Card.Title>
                                    <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Tên người nhận</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='text' value={tenNguoiNhan} onChange={(e) => setTenNguoiNhan(e.target.value)}></Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className='p-2'>
                                            <Form.Label column sm="4"><h6>Số điện thoại</h6></Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='number' min={1} value={sdtNguoiNhan} onChange={(e) => setSdtNguoiNhan(e.target.value)}></Form.Control>
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
                                                    <Form.Select type='text' value={selectedPhuongNguoiNhan} onChange={(e) => setSelectedPhuongNguoiNhan(e.target.value)}>
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
                                                    <Form.Control type='text' placeholder='Tên đường, Tòa nhà, Số nhà' value={soNhaNguoiNhan} onChange={(e) => setSoNhaNguoiNhan(e.target.value)}></Form.Control>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{marginBottom: '10px'}}>
                        <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin hàng hóa</Card.Title>
                                <Row>
                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="3"><h6>Loại hàng</h6></Form.Label>
                                                <Col sm="9">
                                                    <Form.Select value={loaiHang} onChange={(e) => setLoaiHang(e.target.value)}>
                                                        {uniqueLoaiHang.map((loaiHang, index) => 
                                                            <option key={index} value={loaiHang}>{loaiHang}</option>
                                                        )}
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="3"><h6>Tên hàng</h6></Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type='text' value={tenHang} onChange={(e) => setTenHang(e.target.value)}></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="3"><h6>Số lượng</h6></Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type='number' value={soLuong}></Form.Control>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="3"><h6>Trọng lượng</h6></Form.Label>
                                                <Col sm="9">
                                                    <Form.Select value={khoiLuong} onChange={(e) => setKhoiLuong(parseFloat(e.target.value))}>
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
                                                {loaiVanChuyen == 'Liên tỉnh' && (
                                                <Col sm="9">
                                                    <Form.Group as={Row} className='p-2'>
                                                        <Form.Label column sm="4"><h6>Chiều dài</h6></Form.Label>
                                                        <Col sm="8">
                                                            <Form.Control type='number' step={0.01} value={chieuDai} onChange={(e) => setChieuDai(parseFloat(e.target.value))}></Form.Control>
                                                        </Col>                                                        
                                                    </Form.Group>
                                                    <Form.Group as={Row} className='p-2'>
                                                        <Form.Label column sm="4"><h6>Chiều rộng</h6></Form.Label>
                                                        <Col sm="8">
                                                            <Form.Control type='number' step={0.01} value={chieuRong} onChange={(e) => setChieuRong(parseFloat(e.target.value))}></Form.Control>
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                                )}

                                                {loaiVanChuyen == 'Nội tỉnh' && (
                                                <Col sm="9">
                                                    <Form.Group as={Row} className='p-2'>
                                                        <Form.Label column sm="4"><h6>Chiều dài</h6></Form.Label>
                                                        <Col sm="8">
                                                            <Form.Control type='number' value={chieuDai} onChange={(e) => setChieuDai(parseFloat(e.target.value))} disabled></Form.Control>
                                                        </Col>                                                        
                                                    </Form.Group>
                                                    <Form.Group as={Row} className='p-2'>
                                                        <Form.Label column sm="4"><h6>Chiều rộng</h6></Form.Label>
                                                        <Col sm="8">
                                                            <Form.Control type='number' value={chieuRong} onChange={(e) => setChieuRong(parseFloat(e.target.value))} disabled></Form.Control>
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                                )}
                                                
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Phí cố định</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={phiCoDinh} disabled></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Phí VAT</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' disabled value={phiVAT}></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Tiền cọc</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={phiCoc} onChange={(e) => setPhiCoc(parseInt(e.target.value))} ></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Phí nâng</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={phiNang} onChange={(e) => setPhiNang(parseInt(e.target.value))}></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Phí hạ</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={phiHa} onChange={(e) => setPhiHa(parseInt(e.target.value))}></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Thưởng shipper</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={phiThuong} onChange={(e) => setPhiThuong(parseInt(e.target.value))}></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Phí khác</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' value={phiKhac} onChange={(e) => setPhiKhac(parseInt(e.target.value))}></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            {loaiVanChuyen === 'Nội tỉnh' && (
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
                                            {loaiVanChuyen === 'Liên tỉnh' && (
                                                <Form.Group as={Row} className='p-2'>
                                                    <Form.Label column sm="5"><h6>Khoảng cách</h6></Form.Label>
                                                    <Col sm="7">
                                                        <Form.Control type='number' min={1} disabled value={khoangCach}></Form.Control>
                                                    </Col>
                                                </Form.Group>
                                            )}
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="5"><h6>Tổng phí</h6></Form.Label>
                                                <Col sm="7">
                                                    <Form.Control type='number' min={1} disabled value={tongPhi}></Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                            </Card.Body>
                        </Card>
                        </Col>
                        
                    </Row>

                    {loaiVanChuyen === 'Liên tỉnh' && (
                        <Row style={{marginBottom: '10px'}}>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin tài xế</Card.Title>
                                        <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="4"><h6>Tên tài xế</h6></Form.Label>
                                                <Col sm="8">
                                                    <Form.Select value={tenTaiXe} onChange={handleTaiXeChange}>
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
                                                    <Form.Control type='number' value={sdtTaiXe} disabled></Form.Control>
                                                </Col>
                                            </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:'22px', fontStyle:'both', textAlign:'center'}}>Nhập thông tin xe</Card.Title>
                                        <Form.Group as={Row} className='p-2'>
                                                <Form.Label column sm="4"><h6>Loại xe</h6></Form.Label>
                                                <Col sm="8">
                                                    <Form.Select value={loaiXeChon} onChange={(e) => setLoaiXeChon(e.target.value)}>
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
                                                    <Form.Select value={bienSo} onChange={(e) => setBienSo(e.target.value)}>
                                                        <option>Chọn biển số xe</option>
                                                        {locBienSoXe.map((bienSo, index) => 
                                                            <option key={index} value={bienSo}>{bienSo}</option>
                                                        )}
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col></Col>
                        <Col>
                            <div style={{width: '500px'}}>
                                <Button type='submit' style={{backgroundColor: '#009d63'}} onClick={handleSubmit}> Thêm đơn hàng</Button>
                            </div>
                        </Col>
                        <Col></Col>            
                    </Row>
                </Form>
            </Row>
        </div>
    );
};

export default (TaoDonHang);