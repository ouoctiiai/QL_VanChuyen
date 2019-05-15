import axios from "axios";
import { useEffect } from "react";
import { Table } from 'react-bootstrap';
import { listTaiXe } from '../..//Api/DataVanDon';
import React, { useState } from 'react';


const DSTaiXe = () => {

  const [vandons, setVanDons] = useState([])

  useEffect(() => {
      listTaiXe().then((Response) =>{
        setVanDons(Response.data);
      }).catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, [])

  return(
    <>
    <Table style={{backgroundColor: 'white'}}>
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
                <td>{item.maTaiXe}</td>
                <td>{item.tenTaiXe}</td>
                <td>{item.sdtTaiXe}</td>
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