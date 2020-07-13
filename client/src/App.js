import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { fetchLogs } from './API'

const App = () => {
  const [logs, setLogs] = React.useState([])
  const [selected, setSelected] = React.useState(null)
  const [viewport, setViewport] = React.useState({
    width: '100vw',
    height: '100vh',
    latitude: 15.4913249,
    longitude: 78.2356772,
    zoom: 8
  });

  React.useEffect(() => {
    (async () => {
      const data = await fetchLogs()
      setLogs(data.logs)
    })();
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/codinggraden/ckcf90duj0ckb1hp4jgqyflsb"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logs.map(log => (
          <>
          <Marker latitude={log.latitude} longitude={log.longitude} offsetLeft={-20} offsetTop={-10}>
            <svg
              onClick={() => setSelected(log._id)}
              style={{ 
                transform : 'translate(25%, -65%)'
               }}
              viewBox="0 0 24 24"
              width="28"
              height="28"
              stroke="#00ff00"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          {
            selected === log._id && (
              <Popup
                longitude={log.longitude}
                latitude={log.latitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                anchor="top"
                onClose={() =>
                   setSelected(null)
                }
              >
                <div style={{ maxWidth : '300px' }}>
                  <h1>{ log.title }</h1>
                  <p>{ log.description }</p> 
                  <small>Visited on: { log.date.toLocaleString() }</small>
                </div>
              </Popup>
            )
          }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default App;
