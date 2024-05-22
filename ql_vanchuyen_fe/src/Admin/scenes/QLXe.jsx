import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import '../index.css'
import { listXe } from '../../Api/DataVanDon';

const DSXe = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [xes, setXes] = useState([]);

  useEffect(() => {
    listXe().then((Response) =>{
      const dataWithSTT = Response.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        id: index,
      }));
      setXes(dataWithSTT);
    }).catch(error => {
      console.error('Error fetching data: ', error);
    })
  }, []);
  
  const columns = [
    { field: "stt", headerName: "STT", flex: 1 },
    { field: "bienSo", headerName: "Biển số xe", flex: 1 },
    { field: "tenXe", headerName: "Tên xe", flex: 1 },
    { field: "loaiXe", headerName: "Loại xe", flex: 1 },
    { field: "hangXe", headerName: "Hãng xe", flex: 1 },
  ];
  
  

  return (
      <Box m="20px">
      <Header title="ADMIN" subtitle="Quản lí xe" />
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
        <DataGrid checkboxSelection rows={xes} columns={columns} />
      </Box>
    </Box> 

  );
};

export default DSXe;
