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

  const [distance, setDistance] = useState(null);
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiYnBibiIsImEiOiJjbHZ4cGVkNWwyZm41MmltZ2lpam1oZXE4In0.81EqtEQcONtNnO_l4iwBhQ';

  const getDirections = (origin, destination) => {
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}.json?access_token=${MAPBOX_TOKEN}&geometries=geojson` // Include geometries parameter
      )
      .then(function (response) {
        const distance = response.data.routes[0].distance / 1000;
        setDistance(distance);
        const geojson = response.data.routes[0].geometry;
        // Add logic to update viewport to focus on the route (optional)
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
      {getDirections(addressa, addressb)}

      {distance && (
        <div>
          Khoảng cách: {distance.toFixed(2)} km
        </div>
      )}
    </ReactMapGL>
  )
}

export default Mapbox
