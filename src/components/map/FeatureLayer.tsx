import React from 'react';
import { Marker, Popup, Polygon } from 'react-leaflet';
import { useMapStore } from '../../store/useMapStore';
import L from 'leaflet';

// Custom icon for better visibility
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const FeatureLayer: React.FC = () => {
  const { drawnFeatures, layers, removeFeature } = useMapStore();

  // Safe date formatting function
  const formatDate = (date: any) => {
    if (!date) return 'Unknown date';
    
    try {
      if (date instanceof Date) {
        return date.toLocaleString();
      }
      
      if (typeof date === 'string') {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate.toLocaleString();
        }
      }
      
      if (typeof date === 'number') {
        return new Date(date).toLocaleString();
      }
      
      return 'Invalid date';
    } catch (error) {
      return 'Date error';
    }
  };

  if (!layers.drawnFeatures) return null;

  console.log('🔄 Rendering features:', drawnFeatures.length);

  return (
    <>
      {drawnFeatures.map((feature) => {
        if (feature.type === 'point') {
          return (
            <Marker
              key={feature.id}
              position={feature.coordinates as [number, number]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-gray-900">{feature.properties.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Type: Point
                  </p>
                  <p className="text-sm text-gray-600">
                    Coordinates: {feature.coordinates[0].toFixed(4)}, {feature.coordinates[1].toFixed(4)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created: {formatDate(feature.properties.createdAt)}
                  </p>
                  <button
                    onClick={() => removeFeature(feature.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        }
        
        if (feature.type === 'polygon') {
          return (
            <Polygon
              key={feature.id}
              positions={feature.coordinates as [number, number][]}
              color="#3b82f6"
              weight={3}
              fillColor="#3b82f6"
              fillOpacity={0.3}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-gray-900">{feature.properties.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Type: Polygon
                  </p>
                  <p className="text-sm text-gray-600">
                    Points: {(feature.coordinates as [number, number][]).length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created: {formatDate(feature.properties.createdAt)}
                  </p>
                  <button
                    onClick={() => removeFeature(feature.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </Popup>
            </Polygon>
          );
        }
        
        return null;
      })}
    </>
  );
};

export default FeatureLayer;
