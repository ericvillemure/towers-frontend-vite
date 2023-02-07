import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { TowersResult } from './core/interfaces'
import { LngLatBounds } from 'mapbox-gl'

import TowerMap from './TowerMap'


function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<TowersResult>({ towers: [], towersTotalCount: 0 })
  const [isLoading, setLoading] = useState(false)

  const boundsToQueryString = (bounds: LngLatBounds) => {
    return `n=${bounds.getNorth()}&s=${bounds.getSouth()}&e=${bounds.getEast()}&w=${bounds.getWest()}`;
  }

  const loadTowers = async (bounds: LngLatBounds) => {
    setLoading(true)
    fetch(`/api/coordinates?${boundsToQueryString(bounds)}`)
      .then((res) => res.json())
      .then((data: TowersResult) => {
        setData(data);
        setLoading(false)
      })
  }

  const [viewState, setViewState] = useState({
    longitude: -73.410002,
    latitude: 45.485309,
    zoom: 10
  });


  return (
    <div className="App">
      <h1>Canadian Cell Phone Towers</h1>
      <p>Click on any marker to list all providers connected to the antenna</p>

      <TowerMap isLoading={isLoading} towers={data.towers} loadTowers={loadTowers} maplibreViewState={viewState}
        setMaplibreViewState={setViewState} />
      <p>
        This app was developped by <a href="https://www.linkedin.com/in/ericvillemure/">Eric Villemure</a> and the code can be found <a href="https://github.com/ericvillemure/towers-frontend-vite">here</a>
        <br />Please note that this project is a work in progress
      </p>
    </div>
  )
}

export default App
