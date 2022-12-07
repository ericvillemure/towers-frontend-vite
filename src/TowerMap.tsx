/*
*/

import * as React from 'react';
import Map, { Marker, ViewState, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { LngLatBounds } from 'mapbox-gl';

//import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';

import { TowerInfo } from "./core/interfaces";
import { useCallback, useMemo, useRef, useState } from 'react';


import LoadingOverlay from 'react-loading-overlay-ts';

// export async function getServerSideProps(context) {
// export async function getStaticProps() {
//     const getTowers = require('../../core/towers').getTowers;
//     return {
//         props: { towers: await getTowers() }, // will be passed to the page component as props
//     }
// }

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
                        style={{ backgroundColor: "black" }}
                        anchor="top"
                        longitude={Number(popupInfo.coordinates.longitude)}
                        latitude={Number(popupInfo.coordinates.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.coordinates.latitude},{popupInfo.coordinates.longitude}
                            <table>
                                <tbody>
                                    {popupInfo.antennas.map(antenna => <tr><td>{antenna.licensee}</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </Popup>
                )}
            </Map>
        </LoadingOverlay>
    </>;
}
