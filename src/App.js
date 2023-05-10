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
  const [showRoutingForm, setFormView] = useState(false);

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

  async function handleRouteSubmit(event) {
    event.preventDefault();
    // Reset previous waypoints
    if (waypoints) {
      setWaypoints();
    }
    // Hide the form
    setFormView(false);

    const formData = new FormData(event.target);
    const locations = formData.getAll('location');
    const res = await fetch(url + '/route', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ locations }),
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
          {showRoutingForm && (
            <form onSubmit={handleRouteSubmit}>
              <div className="posOne">
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Staring Point"
                />
              </div>
              <div className="posTwo">
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="End Point"
                />
              </div>
              <button className="addloc">Find Path</button>
            </form>
          )}
          <FontAwesomeIcon
            icon={faRoute}
            style={{ color: '#1EE2C7' }}
            onClick={() => {
              setFormView((showRoutingForm) => !showRoutingForm);
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
