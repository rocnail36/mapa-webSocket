import { LatLng } from 'leaflet'
import  { useCallback, useContext, useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import {v4 as uuid} from "uuid"
import { MarkerClick } from './Marker'
import { SocketContext } from '../providers/SocketProvider'

export const LocationMarker = () => {

  const {socket} = useContext(SocketContext)
  const [markers, setmarkers] = useState<{[key:string]:LatLng}>({})


  const event = useMapEvents({
    click:(data) => {
        const {latlng} = data
        const id = uuid()
        socket.emit("createMark",{id,latlng})
       }
  })

 
  useEffect(() => {
    socket.on("createMarkFromServer",(data) => {

      const {id,latlng} = data

      setmarkers(old => { 
        const  markers = {...old}
         markers[id] = latlng
         console.log(markers)
         return markers
     })
    })
  },[])



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
