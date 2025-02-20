/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
'use client'

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '15px 0px 0px 15px',
};

const defaultMapCenter = {
    lat: 35.8799866,
    lng: 76.5048004
}

const defaultMapZoom = 10

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
};

const MapComponent = () => {
    return (
        <GoogleMap
            mapContainerStyle={defaultMapContainerStyle}
            center={defaultMapCenter}
            zoom={defaultMapZoom}
            options={defaultMapOptions}>
        </GoogleMap>
    )
};

export { MapComponent };