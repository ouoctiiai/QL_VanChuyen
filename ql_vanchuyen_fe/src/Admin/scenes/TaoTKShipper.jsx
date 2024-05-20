import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
                sx={{ gridColumn: "span 4" }}
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
  soTK: "",
};

export default Form;
