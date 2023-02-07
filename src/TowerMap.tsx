/*
*/

import * as React from 'react';
import Map, { Marker, ViewState, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { LngLatBounds } from 'mapbox-gl';

//import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';

import { TowerInfo } from "./core/interfaces";
import { useCallback, useMemo, useRef, useState } from 'react';


import LoadingOverlay from 'react-loading-overlay-ts';

interface PropsType {
    isLoading: boolean
    towers: Array<TowerInfo>
    loadTowers: (bounds: LngLatBounds) => void
    maplibreViewState: {
        latitude: number
        longitude: number
        zoom: number
    }
    setMaplibreViewState: (viewState: ViewState) => void
}

export default function TowerMap({ towers, loadTowers, maplibreViewState, setMaplibreViewState, isLoading }: PropsType) {
    const [popupInfo, setPopupInfo] = useState<TowerInfo | null>(null);
    return <>


        <LoadingOverlay
            active={isLoading}
            spinner
            text='Loading...'
        >
            <Map
                {...maplibreViewState}
                style={{ width: 1024, height: 768 }}
                mapLib={maplibregl}
                mapStyle='https://demotiles.maplibre.org/style.json'
                // mapStyle='https://api.maptiler.com/maps/streets/style.json'
                // mapStyle="mapbox://styles/mapbox/streets-v9"
                onMoveEnd={e => {
                    setMaplibreViewState(e.viewState)
                    loadTowers(e.target.getBounds())
                }}
                onLoad={e => loadTowers(e.target.getBounds())}
            >
                <NavigationControl />
                <GeolocateControl showAccuracyCircle={false} showUserLocation={false} />
                {towers.map(tower =>

                    <Marker key={`(${tower.coordinates.longitude},${tower.coordinates.latitude})`} scale={0.5}
                        longitude={tower.coordinates.longitude} latitude={tower.coordinates.latitude} onClick={e => {
                            // If we let the click event propagates to the map, it will immediately close the popup
                            // with `closeOnClick: true`
                            e.originalEvent.stopPropagation();
                            setPopupInfo(tower);
                        }}>



                    </Marker>
                )}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.coordinates.longitude)}
                        latitude={Number(popupInfo.coordinates.latitude)}
                        onClose={() => setPopupInfo(null)}
                        className="popup-content"
                        closeButton={false}
                    >
                        
                        <div>
                            <h3>{popupInfo.coordinates.latitude},</h3>
                            <h3>{popupInfo.coordinates.longitude}</h3>
                            <table>
                                <thead>
                                <th>Provider</th>
                                <th>BW (Hz)</th>
                                <th>Elevation (m)</th>
                                </thead>
                                <tbody>
                                    {popupInfo.antennas.map(antenna => <tr>
                                        <td>{antenna.licensee}</td>
                                        <td>{antenna.transmit_bw}</td>
                                        <td>{antenna.site_elev}</td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </Popup>
                )}
            </Map>
        </LoadingOverlay>
    </>;
}
