import { LatLng } from 'leaflet'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Marker, Popup, useMapEvent, useMapEvents } from 'react-leaflet'
import {v4 as uuid} from "uuid"
import { MarkerClick } from './Marker'

export const LocationMarker = () => {

  const [markers, setmarkers] = useState<{[key:string]:LatLng}>({})


  const event = useMapEvents({
    click:(data) => {
        const {latlng} = data
        setmarkers(old => { 
           const  markers = {...old}
            markers[uuid()] = latlng
            return markers
        })
       }
  })
 console.log(markers)

  const changeMarker = useCallback((id:string,position:LatLng) => {

   
    setmarkers(old => { 
        const  markers = {...old}
         markers[id] = position
         return markers
     })


  },[])

   

  return (
    <>
    {
        Object.entries(markers).map(([id,position]) => (
        <MarkerClick id={id} key={id} position={position} changeMarker={changeMarker}/>
        ))
    }
    </>
  )
}
