import axios from "axios";
import { useEffect } from "react";
import { Table } from 'react-bootstrap';
import { listXe } from '../..//Api/DataVanDon';
import React, { useState } from 'react';


const DSXe = () => {

  const [xes, setVanDons] = useState([])

  useEffect(() => {
      listXe().then((Response) =>{
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
          <th>Biển số xe</th>
          <th>Tên xe</th>
          <th>Loại xe</th>
          <th>Hãng xe</th>
        </tr>
      </thead>
      <tbody>
        {
          xes.map((item)=>{
            return(
              <tr>
                <td>{item.bienSo}</td>
                <td>{item.tenXe}</td>
                <td>{item.loaiXe}</td>
                <td>{item.hangXe}</td>
              </tr>

            )
          })
        }
      </tbody>
    </Table>

    </>
  )
}
export default DSXe;