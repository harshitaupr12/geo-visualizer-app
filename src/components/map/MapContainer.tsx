import React from 'react';
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import { useMapStore } from '../../store/useMapStore';
import DrawingHandler from './DrawingHandler';
import FeatureLayer from './FeatureLayer';
import CustomControls from './CustomControls';
import SatelliteLayers from './SatelliteLayers';
import 'leaflet/dist/leaflet.css';

// Fix for default markers - CDN URLs use karte hain
import L from 'leaflet';

// CDN URLs for marker images
const iconRetinaUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

// Default marker setup
const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Map updater component
function MapUpdater() {
  const map = useMap();
  const { center, zoom } = useMapStore();

  React.useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

const MapContainer: React.FC = () => {
  const { center, zoom, layers } = useMapStore();

  return (
    <div className="h-full w-full">
      <LeafletMap
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="h-full w-full rounded-lg"
      >
        <MapUpdater />

        {/* Base Map - Always show */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Satellite Layers - Toggleable */}
        <SatelliteLayers visible={layers.satellite} />

        {/* Drawing Handler */}
        <DrawingHandler />

        {/* Drawn Features */}
        <FeatureLayer />

        {/* Custom Controls */}
        <CustomControls />
      </LeafletMap>

      {/* Layer status indicator */}
      {layers.satellite && (
        <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm z-[1000] shadow-lg">
          🛰️ Satellite View Active
        </div>
      )}
    </div>
  );
};

export default MapContainer;
