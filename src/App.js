import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {
  const position = [51.505, -0.09];
  return (
    <div className="App">
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
