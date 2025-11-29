import React, { useEffect, useState, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import { useMapStore } from '../../store/useMapStore';
import L from 'leaflet';

const DrawingHandler: React.FC = () => {
  const map = useMap();
  const { selectedTool, addFeature, setSelectedTool } = useMapStore();
  const [polygonPoints, setPolygonPoints] = useState<L.LatLng[]>([]);
  const [tempPolygon, setTempPolygon] = useState<L.Polygon | null>(null);
  const [pointMarkers, setPointMarkers] = useState<L.Marker[]>([]);

  // Clear temporary drawing - useCallback to avoid dependency issues
  const clearDrawing = useCallback(() => {
    if (tempPolygon) {
      map.removeLayer(tempPolygon);
      setTempPolygon(null);
    }
    pointMarkers.forEach(marker => map.removeLayer(marker));
    setPointMarkers([]);
    setPolygonPoints([]);
  }, [map, tempPolygon, pointMarkers]);

  useEffect(() => {
    if (!map) return;

    // Point drawing - Simple click handler
    const handlePointClick = (e: L.LeafletMouseEvent) => {
      console.log('📍 Point click detected at:', e.latlng);
      
      if (selectedTool === 'point') {
        addFeature({
          type: 'point',
          coordinates: [e.latlng.lat, e.latlng.lng],
          properties: {
            name: `Point ${new Date().toLocaleTimeString()}`,
            createdAt: new Date(),
          },
        });
        console.log('✅ Point added successfully');
      }
    };

    // Polygon drawing
    const handlePolygonClick = (e: L.LeafletMouseEvent) => {
      if (selectedTool === 'polygon') {
        const newPoints = [...polygonPoints, e.latlng];
        setPolygonPoints(newPoints);

        // Add point marker
        const marker = L.marker(e.latlng, {
          icon: L.divIcon({
            className: 'polygon-point-marker',
            html: '<div class="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow"></div>',
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          })
        }).addTo(map);
        
        setPointMarkers(prev => [...prev, marker]);

        // Update temporary polygon
        if (tempPolygon) {
          map.removeLayer(tempPolygon);
        }

        if (newPoints.length >= 2) {
          const newPolygon = L.polygon(newPoints, {
            color: '#3b82f6',
            weight: 2,
            fillColor: '#3b82f6',
            fillOpacity: 0.2,
            dashArray: '5, 5',
          }).addTo(map);
          
          setTempPolygon(newPolygon);
        }
      }
    };

    // Finish polygon on double click
    const handleDoubleClick = () => {
      if (selectedTool === 'polygon' && polygonPoints.length >= 3) {
        // Save the polygon
        addFeature({
          type: 'polygon',
          coordinates: polygonPoints.map(p => [p.lat, p.lng]),
          properties: {
            name: `Polygon ${new Date().toLocaleTimeString()}`,
            createdAt: new Date(),
          },
        });

        // Cleanup
        clearDrawing();
        setSelectedTool(null);
        
        // Show success message
        L.popup()
          .setLatLng(map.getCenter())
          .setContent(`
            <div class="p-2">
              <h3 class="font-semibold text-green-600">✓ Polygon Created</h3>
              <p class="text-sm mt-1">Points: ${polygonPoints.length}</p>
            </div>
          `)
          .openOn(map);
      }
    };

    // Cancel drawing on right click or escape
    const handleCancel = (e: L.LeafletMouseEvent) => {
      if (selectedTool === 'polygon' && polygonPoints.length > 0) {
        e.originalEvent.preventDefault();
        clearDrawing();
        
        L.popup()
          .setLatLng(e.latlng)
          .setContent(`
            <div class="p-2">
              <p class="text-sm text-red-600">Polygon drawing cancelled</p>
            </div>
          `)
          .openOn(map);
      }
    };

    // Event listeners - ALWAYS attach for point tool
    if (selectedTool === 'point') {
      console.log('🛠️ Point tool activated - adding click listener');
      map.on('click', handlePointClick);
    } else if (selectedTool === 'polygon') {
      map.on('click', handlePolygonClick);
      map.on('dblclick', handleDoubleClick);
      map.on('contextmenu', handleCancel);
    }

    // Cleanup on tool change
    return () => {
      console.log('🧹 Cleaning up event listeners');
      map.off('click', handlePointClick);
      map.off('click', handlePolygonClick);
      map.off('dblclick', handleDoubleClick);
      map.off('contextmenu', handleCancel);
      
      if (selectedTool !== 'polygon') {
        clearDrawing();
      }
    };
  }, [map, selectedTool, polygonPoints, tempPolygon, pointMarkers, addFeature, setSelectedTool, clearDrawing]);

  return (
    <>
      {/* Drawing instructions */}
      {selectedTool === 'polygon' && (
        <div className="absolute top-20 left-4 z-[1000] bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-sm font-medium">Drawing Polygon</div>
          <div className="text-xs opacity-90">
            • Click to add points ({polygonPoints.length})
            <br/>
            • Double-click to finish
            <br/>
            • Right-click to cancel
          </div>
        </div>
      )}
      
      {/* Point tool indicator */}
      {selectedTool === 'point' && (
        <div className="absolute top-20 left-4 z-[1000] bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-sm font-medium">Adding Points</div>
          <div className="text-xs opacity-90">
            • Click anywhere on map to add points
            <br/>
            • Points will appear immediately
          </div>
        </div>
      )}
    </>
  );
};

export default DrawingHandler;
