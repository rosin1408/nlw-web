import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

interface Props {
    onChangeLocation: (selectedPosition: [number, number]) => void;
}

const EcoletaMap: React.FC<Props> = ({ onChangeLocation }) => {

    const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0,0]);

    const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0,0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([ latitude, longitude ]);
        })
    }, []);

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);

        onChangeLocation(selectedPosition);
    }

    return (
        <Map center={ initialPosition } zoom={15} onClick={ handleMapClick }>
            <TileLayer
                attribution='&amp;copy<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={ selectedPosition }/>
        </Map>
    );
}

export default EcoletaMap;