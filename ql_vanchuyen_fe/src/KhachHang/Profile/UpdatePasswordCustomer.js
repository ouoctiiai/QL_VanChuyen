import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const UpdatePasswordCustomer = () => {
    return (
        <div className='update-customer-container'>
            <div className='update-title' style={{margin: '20px'}}>
                <h2>Cập nhật mật khẩu mới</h2>
            </div>
            <div>
                <Form>
                <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Mật khẩu cũ</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Mật khẩu mới</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Nhập lại mật khẩu</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="password" placeholder="Lặp lại mật khẩu" />
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

export default UpdatePasswordCustomer;