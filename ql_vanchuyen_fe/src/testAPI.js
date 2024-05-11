import React, {useState, useEffect} from 'react'
import api from './Api/axiosConfig';
import Layout from './Layout';

function testAPI() {

    const[vandons, setVanDon] = useState();

    const getVanDons = async()=>{

        try{

            const response = await api.get("/vandon/danh-sach")
            console.log(response.data);
            setVanDon(response.data);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        getVanDons();
    })

  return (
    <div>
      
    </div>
  )
}

export default testAPI
