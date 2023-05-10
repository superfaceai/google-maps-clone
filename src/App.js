import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} id="mapId" zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default App;
