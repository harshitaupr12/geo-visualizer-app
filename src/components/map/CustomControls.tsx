import React from 'react';
import { useMap } from 'react-leaflet';
import { useMapStore } from '../../store/useMapStore';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const CustomControls: React.FC = () => {
  const map = useMap();
  const { setZoom } = useMapStore();

  const handleZoomIn = () => {
    const newZoom = map.getZoom() + 1;
    map.setZoom(newZoom);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = map.getZoom() - 1;
    map.setZoom(newZoom);
    setZoom(newZoom);
  };

  const handleFullscreen = () => {
    const container = map.getContainer();
    if (container.requestFullscreen) {
      container.requestFullscreen();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div
        className="leaflet-control leaflet-bar bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        role="toolbar"
        aria-label="Map controls"
      >
        <button
          onClick={handleZoomIn}
          onKeyDown={(e) => handleKeyPress(e, handleZoomIn)}
          className="p-2 hover:bg-gray-50 transition-colors border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10"
          title="Zoom In"
          aria-label="Zoom in on map"
        >
          <ZoomIn size={18} className="text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          onKeyDown={(e) => handleKeyPress(e, handleZoomOut)}
          className="p-2 hover:bg-gray-50 transition-colors border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10"
          title="Zoom Out"
          aria-label="Zoom out on map"
        >
          <ZoomOut size={18} className="text-gray-700" />
        </button>
        <button
          onClick={handleFullscreen}
          onKeyDown={(e) => handleKeyPress(e, handleFullscreen)}
          className="p-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10"
          title="Fullscreen"
          aria-label="Toggle fullscreen mode"
        >
          <Maximize size={18} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default CustomControls;
