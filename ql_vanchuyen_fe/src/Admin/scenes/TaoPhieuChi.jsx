import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { getDSShipper } from '../../Api/DataTaiKhoan';
import { listTaiXe } from '../../Api/DataVanDon';
import { taoPhieuChi } from '../../Api/DataPhieuChi';

const PhieuChi = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [taiXes, setTaiXes] = useState([]);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    listTaiXe().then((response) => {
      setTaiXes(response.data);
    }).catch(error => {
      console.error('Error fetching data: ', error);
    });
  }, []);

  useEffect(() => {
    getDSShipper().then((response) => {
      setShippers(response.data);
    }).catch(error => {
      console.error('Error fetching data: ', error);
    });
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await taoPhieuChi(values);
      console.log('Tạo phiếu thành công:', response.data);
      alert('Tạo phiếu thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo phiếu:', error);
      alert('Lỗi khi tạo phiếu: ' + error.message);
    }
  };

  const handlePayment = async (type, item) => {
    const values = {
      LoaiPhieuChi: type === 'shipper' ? 'Trả lương Shipper' : 'Trả lương Tài Xế',
      TongTien: item.tongTienCong || item.luongTaiXe,
      ThoiGianLap: new Date(),
      ThongTinShipper: type === 'shipper' ? {
        maShipper: item.maShipper,
        tenShipper: item.tenChuTaiKhoan,
      } : null,
      ThongTinTaiXe: type === 'driver' ? {
        maTaiXe: item.maTaiXe,
        tenTaiXe: item.tenTaiXe,
      } : null,
    };
  
    try {
      await handleFormSubmit(values);
      alert('Tạo phiếu thành công!');
      
      // Sau khi thành công, cập nhật lại danh sách tài xế và shipper trực tiếp
      if (type === 'shipper') {
        const response = await listTaiXe();
        setTaiXes(response.data);
      } else if (type === 'driver') {
        const response = await getDSShipper();
        setShippers(response.data);
      }
    } catch (error) {
      console.error('Lỗi khi tạo phiếu:', error);
      alert('Lỗi khi tạo phiếu: ' + error.message);
    }
  };
  
  


  const handleOtherPayments = async (type, amount) => {
    const values = {
      LoaiPhieuChi: type,
      TongTien: amount,
      ThoiGianLap: new Date(),
    };
    await handleFormSubmit(values);
  };

  return (
    <Box m="20px">
      <Header title="TẠO PHIẾU CHI" subtitle="Tạo từng loại phiếu chi" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Paper sx={{ gridColumn: 'span 2', mb: 2, p: 2 }}>
                <h5>Danh sách lương Shipper</h5>
                <TableContainer sx={{ maxHeight: 440, overflow: 'auto' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell>Thanh Toán</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shippers.map((shipper, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{shipper.tenChuTaiKhoan}</TableCell>
                          <TableCell>{shipper.tongTienCong}</TableCell>
                          <TableCell>
                            {shipper.tongTienCong !== 0 && (
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handlePayment('shipper', shipper)}
                              >
                                Thanh toán
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper sx={{ gridColumn: 'span 2', mb: 2, p: 2 }}>
                <h5>Danh sách lương Tài xế</h5>
                <TableContainer sx={{ maxHeight: 440, overflow: 'auto' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell>Thanh toán</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {taiXes.map((driver, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{driver.tenTaiXe}</TableCell>
                          <TableCell>{driver.luongTaiXe}</TableCell>
                          <TableCell>
                            {driver.luongTaiXe !== 0 && (
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handlePayment('driver', driver)}
                              >
                                Thanh toán
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Box display="flex" alignItems="center" sx={{ gridColumn: "span 4" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Chi phí nâng cấp, sửa chữa xe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chiPhiXe}
                  name="chiPhiXe"
                  error={!!touched.chiPhiXe && !!errors.chiPhiXe}
                  helperText={touched.chiPhiXe && errors.chiPhiXe}
                  sx={{ flex: 1 }}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={() => handleOtherPayments('Chi phí xe', values.chiPhiXe)}
                >
                  Thanh Toán
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ gridColumn: "span 4" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Chi phí nhiên liệu"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chiPhiNhienLieu}
                  name="chiPhiNhienLieu"
                  error={!!touched.chiPhiNhienLieu && !!errors.chiPhiNhienLieu}
                  helperText={touched.chiPhiNhienLieu && errors.chiPhiNhienLieu}
                  sx={{ flex: 1 }}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={() => handleOtherPayments('Chi phí nhiên liệu', values.chiPhiNhienLieu)}
                >
                  Thanh Toán
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ gridColumn: "span 4" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Chi phí thiết bị"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chiPhiThietBi}
                  name="chiPhiThietBi"
                  error={!!touched.chiPhiThietBi && !!errors.chiPhiThietBi}
                  helperText={touched.chiPhiThietBi && errors.chiPhiThietBi}
                  sx={{ flex: 1 }}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={() => handleOtherPayments('Chi phí thiết bị', values.chiPhiThietBi)}
                >
                  Thanh Toán
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  chiPhiXe: yup.number().required("required"),
  chiPhiNhienLieu: yup.number().required("required"),
  chiPhiThietBi: yup.number().required("required"),
});

const initialValues = {
  chiPhiXe: "",
  chiPhiNhienLieu: "",
  chiPhiThietBi: "",
};

export default PhieuChi;
