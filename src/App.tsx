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
    console.log("async moveend",)
  }

  const [viewState, setViewState] = useState({
    longitude: -73.410002,
    latitude: 45.485309,
    zoom: 10
  });


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR test
        </p>
      </div>

      <TowerMap isLoading={isLoading} towers={data.towers} loadTowers={loadTowers} maplibreViewState={viewState}
        setMaplibreViewState={setViewState} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
