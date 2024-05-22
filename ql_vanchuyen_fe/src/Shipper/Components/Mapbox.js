import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactMapGL from "react-map-gl"                 
import { listVanDon } from '../../Api/DataVanDon';
                   
function Mapbox({from, to, setKC}) {
                   
  const getLocate = async (address) => {
    try {
      const responseLocate = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_TOKEN}`
      );             
  
      if (responseLocate.data.features.length === 0) {         
        throw new Error('No location found for the provided address');
      }
  
      return {
        latitude: responseLocate.data.features[0].center[1],
        longitude: responseLocate.data.features[0].center[0],
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  };

  const getDirections = (origin, destination) => {
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}.json?access_token=${MAPBOX_TOKEN}&geometries=geojson`
      )
      .then(function (response) {
        const distance = response.data.routes[0].distance / 1000;
        setDistance(distance);
        setKC(parseFloat(distance.toFixed(2)))
        const geojson = response.data.routes[0].geometry;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [viewport, setViewport] = React.useState({
    width: '100vw',
    height: '100vh',
    latitude: null,
    longitude: null,
    zoom: 14
  });

  const [locatea, setLocatea] = useState(null); 
  const [locateb, setLocateb] = useState(null);
  const[distance, setDistance] = useState('');
  const [error, setError] = useState(null);
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiYnBibiIsImEiOiJjbHZ4cGVkNWwyZm41MmltZ2lpam1oZXE4In0.81EqtEQcONtNnO_l4iwBhQ';

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const responseLocatea = await getLocate(from);
        setLocatea(responseLocatea);

        const responseLocateb = await getLocate(to);
        setLocateb(responseLocateb);

        if (locatea) {
          setViewport({
            ...viewport,
            latitude: locatea.latitude,
            longitude: locatea.longitude
          });
        }

        if (locatea && locateb) {
          getDirections(locatea, locateb); 
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchLocations();
  }, [from, to, getLocate]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxAccessToken = {MAPBOX_TOKEN}    
    >
      {distance && (
        <div style={{color:'black'}}>
         Khoảng cách: {distance.toFixed(2)} km
        </div>
      )}
    </ReactMapGL>                                       
  )
}

export default Mapbox                  
