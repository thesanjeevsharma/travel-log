import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useForm } from 'react-hook-form'

import { fetchLogs, createLog } from './API'

const App = () => {
  const [logs, setLogs] = React.useState([])
  const [error, setError] = React.useState('')
  const [selected, setSelected] = React.useState(null)
  const [newLog, setNewLog] = React.useState(null)
  const [viewport, setViewport] = React.useState({
    width: '100vw',
    height: '100vh',
    latitude: 78.2356772,
    longitude: 15.4913249,
    zoom: 8
  });

  const { register, handleSubmit } = useForm()

  React.useEffect(() => {
    (async () => {
      const response = await fetchLogs()
      setLogs(response.logs)
    })();
  }, [])

  const addLogHandler = event => {
    setNewLog({ latitude : event.lngLat[1], longitude : event.lngLat[0] })
  }

  const onSubmit = async (data) => {
    try {
      const log = { ...data, ...newLog }
      const response = await createLog(log)
      setLogs([...logs, response.log])
      setError('')
      setNewLog(null)
    } catch(error) {
      setError(error.message)
    }
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/codinggraden/ckcf90duj0ckb1hp4jgqyflsb"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={addLogHandler}
    >
      {
        logs.map(log => (
          <React.Fragment key={log._id}>
            <Marker latitude={log.latitude} longitude={log.longitude}>
              <svg
                onClick={() => setSelected(log._id)}
                className="marker"
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
                  className="popup"
                >
                  <h1>{ log.title }</h1>
                  <p>{ log.description }</p> 
                  <small>Visited on: { log.date.toLocaleString() }</small>
                  <img src={ log.image } alt={ log.title }/>
                </Popup>
              )
            }
          </React.Fragment>
        ))
      }
      {
        newLog && (
          <>
            <Marker latitude={newLog.latitude} longitude={newLog.longitude}>
              <svg
                className="marker"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                stroke="#0000ff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </Marker>
            <Popup
                longitude={newLog.longitude}
                latitude={newLog.latitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                anchor="top"
                onClose={() =>
                  setNewLog(null)
                }
                className="popup"
              >
                {error && <h6>{error}</h6>}
                <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
                  <label>Title</label>
                  <input type="text" name="title" ref={register} required/>
                  <label>Description</label>
                  <textarea rows="2" name="description" ref={register}></textarea>
                  <label>Comments</label>
                  <textarea rows="2" name="comments" ref={register}></textarea>
                  <label>Image</label>
                  <input type="text" name="image" ref={register}/>
                  <label>Date Visited</label>
                  <input type="date" name="date" ref={register} required/>
                  <button type="submit">Add Log</button>
                </form>
            </Popup>
          </>
        )
      }
    </ReactMapGL>
  );
}

export default App;
