import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import '../index.css'
import { listTaiXe } from '../../Api/DataVanDon';

const DSTaiXe = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [taiXes, setTaiXes] = useState([]);

  useEffect(() => {
    listTaiXe().then((Response) =>{
      const dataWithSTT = Response.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        id: index,
      }));
      setTaiXes(dataWithSTT);
    }).catch(error => {
      console.error('Error fetching data: ', error);
    })
  }, []);
  
  const columns = [
    { field: "stt", headerName: "STT", flex: 1 },
    { field: "maTaiXe", headerName: "Mã Tài xế", flex: 1 },
    { field: "tenTaiXe", headerName: "Tên Tài Xế", flex: 1 },
    { field: "sdtTaiXe", headerName: "Số điện thoại tài xế", flex: 1 },
  ];
  
  

  return (
      <Box m="20px">
      <Header title="ADMIN" subtitle="Quản lí tài xế" />
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
        <DataGrid checkboxSelection rows={taiXes} columns={columns} />
      </Box>
    </Box> 

  );
};

export default DSTaiXe;
