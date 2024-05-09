import axios from 'axios';
import React, { useState } from 'react'
import ReactMapGL from "react-map-gl"

function Mapbox() {
  const [viewport, setViewport] = React.useState({
    width: '100vw',
    height: '100vh',
    latitude: 21.0286,
    longitude: 105.8012,
    zoom: 10
  });
  
  const addressa ={
    latitude: 10.7795,
    longitude: 106.6917
  }
  
  const addressb ={
    latitude: 21.0286,
    longitude: 105.8012
  }

  const [locateb, setLocateb] = useState();
  const [distance, setDistance] = useState(null);
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiYnBibiIsImEiOiJjbHZ4cGVkNWwyZm41MmltZ2lpam1oZXE4In0.81EqtEQcONtNnO_l4iwBhQ';

  // Code from the image
  const getLocate = (address) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_TOKEN}`
      )
      .then(function (responseLocate) {
        setLocateb({
          latitude: responseLocate.data.features[0].center[1],
          longitude: responseLocate.data.features[0].center[0],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDirections = (origin, destination) => {
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}.json?access_token=${MAPBOX_TOKEN}&geometries=geojson`
      )
      .then(function (response) {
        const distance = response.data.routes[0].distance / 1000;
        setDistance(distance);
        const geojson = response.data.routes[0].geometry;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxAccessToken = {MAPBOX_TOKEN}
    >
      {getLocate("Ha Noi, Vietnam")}
      {getDirections(addressa, addressb)}

      {distance && (
        <div>
          Khoảng cách: {distance.toFixed(2)} km
        </div>
      )}

      {locateb && (
        <div>
          Địa chỉ: {locateb.latitude}, {locateb.longitude}
        </div>
      )}
    </ReactMapGL>
  )
}

export default Mapbox
