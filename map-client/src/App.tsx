import { useState } from 'react'
import './App.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, } from 'react-leaflet'
import { LocationMarker } from './components/LocationMarker'

function App() {
  
  const position = [51.505, -0.09]

 

  return (

       <MapContainer className='map' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505,-0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    <LocationMarker/>
  </MapContainer>

  )
}

export default App
