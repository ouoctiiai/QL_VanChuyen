import axios from "axios";
import { useEffect } from "react";
import { Table } from 'react-bootstrap';
import { listVanDon } from '../../Api/axiosConfig';
import React, { useState } from 'react';


const DSTaiXe = () => {

  const [vandons, setVanDons] = useState([])

  useEffect(() => {
      listVanDon().then((Response) =>{
        setVanDons(Response.data);
      }).catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, [])

  return(
    <>
    <Table>
      <thead>
        <tr>
          <th>Mã Tài xế</th>
          <th>Tên Tài Xế</th>
          <th>Số điện thoại tài xế</th>
        </tr>
      </thead>
      <tbody>
        {
          vandons.map((item)=>{
            return(
              <tr>
                <td>{item.thongTinTaiXe.maTaiXe}</td>
                <td>{item.thongTinTaiXe.tenTaiXe}</td>
                <td>{item.thongTinTaiXe.sdtTaiXe}</td>
              </tr>

            )
          })
        }
      </tbody>
    </Table>

    </>
  )
}
export default DSTaiXe;