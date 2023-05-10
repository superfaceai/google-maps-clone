import './App.css';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import RoutingMachine from './RoutingMachine';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const url = 'http://localhost:5000';

function App() {
  const inputEle = useRef();
  const [locations, setLocations] = useState([]);
  const [inputLoc, setInputloc] = useState('');
  const waypoints = [
    {
      latitude: 51.505,
      longitude: -0.09,
    },
    {
      latitude: 51.467,
      longitude: -0.458,
    },
  ];

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
        let obj = {
          address: inputLoc,
          lat: data.latitude,
          long: data.longitude,
        };
        setLocations((locations) => [...locations, obj]);
        inputEle.current.value = '';
      })
      .catch((err) => {
        throw new Error(`Invalid response`);
      });
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
      <MapContainer center={[51.505, -0.09]} id="mapId" zoom={13}>
        {locations.map((loc, key) => {
          return (
            <Marker key={key} position={[loc.lat, loc.long]}>
              <Popup>{loc.address}</Popup>
            </Marker>
          );
        })}
        <RoutingMachine waypoints={waypoints} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default App;
