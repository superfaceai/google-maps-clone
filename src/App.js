import './App.css';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faRoute } from '@fortawesome/free-solid-svg-icons';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
const url = 'http://localhost:5000';

function App() {
  const inputEle = useRef();
  const [locations, setLocations] = useState([]);
  const [waypoints, setWaypoints] = useState();
  const [inputLoc, setInputloc] = useState('');
  const [routeLocOne, setRouteLocOne] = useState('');
  const [routeLocTwo, setRouteLocTwo] = useState('');
  const [formView, setFormView] = useState(false);

  useEffect(() => {}, [waypoints]);

  async function handleSubmit() {
    const data = inputLoc;
    await fetch(url + '/cor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        loc: data,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          let obj = {
            address: inputLoc,
            lat: data.response.latitude,
            long: data.response.longitude,
          };
          setLocations((locations) => [...locations, obj]);
          inputEle.current.value = '';
        } else {
          alert('Something went wrong');
        }
      })
      .catch((err) => {
        throw new Error(`Invalid response`);
      });
  }

  async function addPath() {
    if (waypoints) {
      setWaypoints();
    }
    const loc1 = routeLocOne;
    const loc2 = routeLocTwo;
    setFormView(false);
    const res = await fetch(url + '/route', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        loc1: loc1,
        loc2: loc2,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      alert(`Something went wrong.\n${err}`);
    } else {
      const data = await res.json();
      setWaypoints(data.waypoints);
    }
  }

  return (
    <div className="App">
      <div className="inputBlock">
        <input
          type="text"
          id="location"
          ref={inputEle}
          name="location"
          required
          placeholder="Enter location"
          onChange={(e) => setInputloc(e.target.value)}
        />
        <div className="addloc">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ color: '#1EE2C7' }}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className="routeBlock">
        <div className="addRoutes">
          {formView ? (
            <div>
              <div className="posOne">
                <input
                  type="text"
                  required
                  onChange={(e) => setRouteLocOne(e.target.value)}
                  placeholder="Staring Point"
                />
              </div>
              <div className="posTwo">
                <input
                  type="text"
                  required
                  onChange={(e) => setRouteLocTwo(e.target.value)}
                  placeholder="End Point "
                />
              </div>
              <button className="addloc" onClick={addPath}>
                Find Path
              </button>
            </div>
          ) : (
            ''
          )}
          <FontAwesomeIcon
            icon={faRoute}
            style={{ color: '#1EE2C7' }}
            onClick={() => {
              setFormView(true);
            }}
          />
        </div>
      </div>
      <MapContainer center={[31.505, 70.09]} id="mapId" zoom={4}>
        {locations.map((loc, key) => {
          return (
            <Marker key={key} position={[loc.lat, loc.long]}>
              <Popup>{loc.address}</Popup>
            </Marker>
          );
        })}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {waypoints ? <RoutingMachine waypoints={waypoints} /> : ''}
      </MapContainer>
    </div>
  );
}

export default App;
