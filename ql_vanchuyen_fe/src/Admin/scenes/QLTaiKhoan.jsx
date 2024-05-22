import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import '../index.css'
import { listTaiKhoan } from '../../Api/DataTaiKhoan';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [taiKhoan, setTaiKhoans] = useState([]);

  useEffect(() => {
    listTaiKhoan().then((Response) => {
      const dataWithSTT = Response.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        id: index,
      }));
      setTaiKhoans(dataWithSTT);
    }).catch(error => {
      console.error('Error fetching data: ', error);
    })
  }, []);

  const columns = [
    { field: "stt", headerName: "STT", flex: 0.5 },
    { field: "tenTaiKhoan", headerName: "Tên tài khoản", flex: 1 },
    { field: "tenChuTaiKhoan", headerName: "Tên chủ tài khoản", flex: 1 },
    { field: "sdt", headerName: "Số điện thoại", flex: 1 },
    {
      field: "loaiTaiKhoan", headerName: "Loại Tài Khoản", flex: 1,
      renderCell: ({ row: { loaiTaiKhoan } }) => {
        let displayText = loaiTaiKhoan;
        if (loaiTaiKhoan === "QuanLy") {
          displayText = "Quản Lý";
        }
        return (
          <Box
            width="50%"
            height="80%"
            p="8px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              loaiTaiKhoan === "QuanLy"
                ? colors.greenAccent[600]
                : loaiTaiKhoan === "Kho"
                  ? colors.greenAccent[700]
                  : loaiTaiKhoan === "Khách hàng"
                    ? colors.greenAccent[700]
                    : loaiTaiKhoan === "Shipper"
                      ? colors.greenAccent[700]
                      : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {loaiTaiKhoan === "QuanLy" && <AdminPanelSettingsOutlinedIcon />}
            {loaiTaiKhoan === "Kho" && <SecurityOutlinedIcon />}
            {loaiTaiKhoan === "Khách hàng" && <SupervisorAccountOutlinedIcon />}
            {loaiTaiKhoan === "Shipper" && <MopedOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "7px", fontSize: "1em" }}>
              {displayText}
            </Typography>
          </Box>
        );
      },
    },    
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
            fontSize: "1.3em",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontSize: "1.4em",
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
