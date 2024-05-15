import React from 'react';
import { memo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button, Form } from 'react-bootstrap';

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
                <form>
                    <div data-mdb-input-init className='form-create-outline md-4'>
                        <input type="text" id="loai" name="loaiHangHoa" value={formState.loaiHangHoa} onChange={handleChange} className={`form-control ${isActiveLoai ? 'active' : ''}`} />
                        <label className='form-label' htmlFor='loai'>Loại Hàng Hoá</label>
                    </div>
                    <div data-mdb-input-init className='form-create-outline md-4'>
                        <input type="text" id="ten" name="tenHangHoa" value={formState.tenHangHoa} onChange={handleChange} className={`form-control ${isActiveTen ? 'active' : ''}`} />
                        <label className='form-label' htmlFor='ten'>Tên Hàng Hoá</label>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            {/* <select class="form-select" id='trongLuong' value={formState.trongLuong} aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">Không xác định được</option>
                                <option value="2">Dưới 50kg</option>
                                <option value="3">Dưới 100kg</option>
                            </select> */}
                            <Form>
                                <Form.Select aria-label="Default select example">
                                    <option>Trọng lượng Hàng Hoá</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form>
                            <label className='form-label' htmlFor='trongLuong'>Trọng lượng</label>
                        </div>
                        <div data-mdb-input-init className='form-create-outline md-4 col-9'>
                            <input type="number" id="soLuong" name="soLuong" value={formState.soLuong} onChange={handleChange} className={`form-control ${isActiveSoLuong ? 'active' : ''}`} />
                            <label className='form-label' htmlFor='soLuong'>Số lượng</label>
                        </div>
                    </div>
                </form>
                <Form>
                    <div>
                        <h3>Thông tin hàng hoá</h3>
                        <Form.Group className="mb-3" controlId="loai">
                            <Form.Label>Loại hàng hoá</Form.Label>
                            <Form.Control type="text" placeholder="Nhập loại hàng hoá ở đây..." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tên">
                            <Form.Label>Tên hàng hoá</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên hàng hoá ở đây..." />
                        </Form.Group>
                    </div>
                    <div>
                        <h3>Thông tin người nhận</h3>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default memo(CreateOrder);