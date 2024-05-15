import React, { useState, useEffect } from 'react';
import { listTaiKhoan } from '../../Api/DataTaiKhoan';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header";

const URL = "http://localhost:4433/taikhoan/danh-sach";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [taiKhoan, setTaiKhoans] = useState([])
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setTaiKhoans(data))
      .catch((error) => console.error(error));
  }, []);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "tenTaiKhoan", headerName: "Tên tài khoản", flex: 1 },
    { field: "tenChuTaiKhoan", headerName: "Tên chủ tài khoản", flex: 1 },
    { field: "sdt", headerName: "Số điện thoại", flex: 1 },
    { field: "loaiTaiKhoan", headerName: "Loại Tài Khoản", flex: 1 },

  ];
  

  return (
    <Box m="20px">
      <Header title="ADMIN" subtitle="Quản lí tài khoản" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={taiKhoan} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
