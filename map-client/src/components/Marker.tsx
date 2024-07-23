
import { latLng, LatLng, LeafletEvent, LeafletEventHandlerFn, LeafletEventHandlerFnMap, LeafletMouseEvent, LeafletMouseEventHandlerFn } from 'leaflet'
import { useMemo, useRef } from 'react'
import { Marker,  Popup } from 'react-leaflet'


type Props = {
    position:LatLng,
    id: string,
    changeMarker: (id: string, position: LatLng) => void
}

export const MarkerClick = ({position,id,changeMarker}:Props) => {

    const markerRef = useRef<any>()

    const eventHandlers = useMemo(
      () => ({
        drag(data:LeafletEvent ) {
          const marker = markerRef.current

          if(marker == null) return
      
          const dataTyped  = (data as unknown as {latlng:{lat:number,lng:number}})
         
          const position = new LatLng(dataTyped.latlng.lat,dataTyped.latlng.lng)
          
          changeMarker(id,position)
          
        
        },
      }),
      [],
    )
  


  return (
    <Marker ref={markerRef} eventHandlers={eventHandlers}  position={position} draggable>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  )
}
