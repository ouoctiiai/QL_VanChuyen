import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const PhieuChi = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const shippers = [
    { name: 'Shipper 1', salary: '500,000 VND' },
    { name: 'Shipper 2', salary: '600,000 VND' }
  ];

  const drivers = [
    { name: 'Driver 1', salary: '700,000 VND' },
    { name: 'Driver 2', salary: '800,000 VND' }
  ];

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
                <h5>Danh sách Shipper</h5>
                <TableContainer>
                  <Table>
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
                          <TableCell>{shipper.name}</TableCell>
                          <TableCell>{shipper.salary}</TableCell>
                          <TableCell><Button variant="contained" color="secondary">Thanh toán</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper sx={{ gridColumn: 'span 2', mb: 2, p: 2 }}>
                <h5>Danh sách Tài xế</h5>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell>Thanh toán</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {drivers.map((driver, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{driver.name}</TableCell>
                          <TableCell>{driver.salary}</TableCell>
                          <TableCell><Button variant="contained" color="secondary">Thanh toán</Button></TableCell>
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
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  chiPhiXe: yup.string().required("required"),
  chiPhiNhienLieu: yup.string().required("required"),
  chiPhiThietBi: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  chiPhiXe: "",
  chiPhiNhienLieu: "",
  chiPhiThietBi: "",
  address2: "",
};

export default PhieuChi;
