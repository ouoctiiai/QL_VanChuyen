import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { Autocomplete } from '@mui/material';


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [banks, setBanks] = useState([]);

  useEffect(() => {
      axios.get('https://api.vietqr.io/v2/banks')
        .then((response) => {
          // http status code
          // 200: thanh cong
          // 400: bad request
          // 401, 403: unauthorized
          // 500: loi backend server
          if (response && response.status === 200) {
            const result = response.data;
            if (result && result.code === "00") {
              setBanks(result.data);
              console.log(banks);
            }
          }
          })
        .catch((error) => {
          console.error('Không thể lấy dữ liệu từ API', error);
        });
    }, []);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE SHIPPER" subtitle="Tạo 1 tài khoản shipper mới" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên tài khoản"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tenTK}
                name="tenTK"
                error={!!touched.tenTK && !!errors.tenTK}
                helperText={touched.tenTK && errors.tenTK}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên chủ tài khoản"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tenChuTK}
                name="tenChuTK"
                error={!!touched.tenChuTK && !!errors.tenChuTK}
                helperText={touched.tenChuTK && errors.tenChuTK}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số điện thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sdt}
                name="sdt"
                error={!!touched.sdt && !!errors.sdt}
                helperText={touched.sdt && errors.sdt}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Căn cước công dân"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cccd}
                name="cccd"
                error={!!touched.cccd && !!errors.cccd}
                helperText={touched.cccd && errors.cccd}
                sx={{ gridColumn: "span 4" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mật khẩu của shipper"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.matkhau}
                name="matkhau"
                error={!!touched.matkhau && !!errors.matkhau}
                helperText={touched.matkhau && errors.matkhau}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.diaChi}
                name="diaChi"
                error={!!touched.diaChi && !!errors.diaChi}
                helperText={touched.diaChi && errors.diaChi}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="tenNH-label"></InputLabel>
                <Autocomplete
                  id="tenNH"
                  options={banks}
                  getOptionLabel={(option) => option.shortName}
                  //value={values.tenNH}
                  onChange={(event, newValue) => {
                    handleChange("tenNH")(newValue ? newValue.shortName : "");
                  }}
                  onBlur={handleBlur("tenNH")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!touched.tenNH && !!errors.tenNH}
                      helperText={touched.tenNH && errors.tenNH}
                      label="Tên Ngân Hàng"
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.shortName}
                    </li>
                  )}
                />
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số Tài Khoản"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.soTK}
                name="soTK"
                error={!!touched.soTK && !!errors.soTK}
                helperText={touched.soTK && errors.soTK}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Tạo tài khoản
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp = /^0[0-9]{9}$/;
const cccdRegExp = /^[0-9]{12}$/;

const checkoutSchema = yup.object().shape({
  tenTK: yup.string().required("Bắt buộc"),
  tenChuTK: yup.string().required("Bắt buộc"),
  email: yup.string().email("Lỗi định dạng Email").required("Bắt buộc"),
  sdt: yup
    .string()
    .matches(phoneRegExp, "Định dạng SDT không đúng")
    .required("Bắt buộc"),
  cccd:yup
    .string()
    .matches(cccdRegExp, "Định dạng CCCD không đúng")
    .required("Bắt buộc"),
  matkhau: yup.string().required("Bắt buộc"),
  diaChi: yup.string().required("Bắt buộc"),
  tenNH: yup.string().required("Bắt buộc"),
  soTK: yup.string().required("Bắt buộc"),
});

const initialValues = {
  tenTK: "",
  tenChuTK: "",
  email: "",
  sdt: "",
  cccd: "",
  matkhau: "",
  diaChi: "",
  tenNH: "",
  soTK: "",
};

export default Form;
