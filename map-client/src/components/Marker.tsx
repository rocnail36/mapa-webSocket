
import { latLng, LatLng, LeafletEvent, LeafletEventHandlerFn, LeafletEventHandlerFnMap, LeafletMouseEvent, LeafletMouseEventHandlerFn } from 'leaflet'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { Marker,  Popup } from 'react-leaflet'
import { SocketContext } from '../providers/SocketProvider'


type Props = {
    position:LatLng,
    id: string,
    changeMarker: (id: string, position: LatLng) => void
}

export const MarkerClick = ({position,id,changeMarker}:Props) => {

    const markerRef = useRef<any>()

    const {socket} = useContext(SocketContext)

    const eventHandlers = useMemo(
      () => ({
        drag(data:LeafletEvent ) {
          const marker = markerRef.current

          if(marker == null) return
      
          const dataTyped  = (data as unknown as {latlng:{lat:number,lng:number}})
         
          const position = new LatLng(dataTyped.latlng.lat,dataTyped.latlng.lng)

          if(id == null || undefined) return

          
         socket.emit("moveMark",{id,position})
          
        
        },
      }),
      [],
    )

    useEffect(() => {
     socket.on("moveMarkFromServer",(data) => {
           const {id,position} = data
           changeMarker(id,position)
     })
    },[])
  


  return (
    <Marker ref={markerRef} eventHandlers={eventHandlers}  position={position} draggable>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  )
}
