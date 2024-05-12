import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = "http://localhost:4433/taikhoan/danh-sach";

function App() {
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(URL).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h1 style={{ color: "green" }}>Using Axios Library to Fetch Data</h1>
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
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.TenTaiKhoan}</p>
            </div>
          );
        })}
      </center>
    </div>
  );
}

export default App;
