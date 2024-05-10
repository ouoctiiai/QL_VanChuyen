import { tokens } from "../theme";

import axios from 'axios';
const URL="http://localhost:4433/taikhoan/danh-sach";
import React, { useState } from 'react';

const [data, setData] = useState([])


  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h1 style={{ color: "green" }}>using Axios Library to Fetch Data</h1>
      <center>
        {data.map((dataObj, index) => {
          return (
            <div
              style={{
                width: "15em",
                backgroundColor: "#CD8FFD",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.name}</p>
            </div>
          );
        })}
      </center>
    </div>
  );