import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { getDSShipper } from '../../Api/DataTaiKhoan';
import { listTaiXe } from '../../Api/DataVanDon';

const PhieuChi = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [taiXes, setTaiXes] = useState([]);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    listTaiXe().then((Response) => {
      setTaiXes(Response.data);
    }).catch(error => {
      console.error('Error fetching data: ', error);
    })
  }, []);

  useEffect(() => {
    getDSShipper().then((Response) => {
      setShippers(Response.data);
    }).catch(error => {
      console.error('Error fetching data: ', error);
    })
  }, []);


  const handleFormSubmit = (event, values) => {
    console.log(values);
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
                            {shipper.tongTienCong !== 0 && <Button variant="contained" color="secondary">Thanh toán</Button>}
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
                            {driver.luongTaiXe !== 0 && <Button variant="contained" color="secondary">Thanh toán</Button>}
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
                  type="text"
                  label="Chi phí nâng cấp, sửa chữa xe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chiPhiXe}
                  name="chiPhiXe"
                  error={!!touched.chiPhiXe && !!errors.chiPhiXe}
                  helperText={touched.chiPhiXe && errors.chiPhiXe}
                  sx={{ flex: 1 }}
                />
                <Button color="secondary" variant="contained" sx={{ ml: 2 }}>
                  Thanh Toán
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ gridColumn: "span 4" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Chi phí nhiên liệu"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chiPhiNhienLieu}
                  name="chiPhiNhienLieu"
                  error={!!touched.chiPhiNhienLieu && !!errors.chiPhiNhienLieu}
                  helperText={touched.chiPhiNhienLieu && errors.chiPhiNhienLieu}
                  sx={{ flex: 1 }}
                />
                <Button color="secondary" variant="contained" sx={{ ml: 2 }}>
                  Thanh Toán
                </Button>
              </Box>

              <Box display="flex" alignItems="center" sx={{ gridColumn: "span 4" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Chi phí thiết bị"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chiPhiThietBi}
                  name="chiPhiThietBi"
                  error={!!touched.chiPhiThietBi && !!errors.chiPhiThietBi}
                  helperText={touched.chiPhiThietBi && errors.chiPhiThietBi}
                  sx={{ flex: 1 }}
                />
                <Button color="secondary" variant="contained" sx={{ ml: 2 }}>
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
  chiPhiXe: yup.string().required("required"),
  chiPhiNhienLieu: yup.string().required("required"),
  chiPhiThietBi: yup.string().required("required"),
});
const initialValues = {
  chiPhiXe: "",
  chiPhiNhienLieu: "",
  chiPhiThietBi: "",
};

export default PhieuChi;
