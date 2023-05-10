import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {
  const position = [51.505, -0.09];

  return (
    <div className="App">
      <div className="inputBlock">
        <input
          type="text"
          id="location"
          name="location"
          required
          placeholder="Enter location"
        />
        <div className="addloc">
          <FontAwesomeIcon icon={faLocationDot} style={{ color: '#1EE2C7' }} />
        </div>
      </div>
      <MapContainer center={[51.505, -0.09]} id="mapId" zoom={13}>
        <Marker position={position}>
          <Popup>Hello World</Popup>
        </Marker>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default App;
