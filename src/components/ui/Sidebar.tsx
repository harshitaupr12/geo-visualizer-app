import React from 'react';
import { useMapStore } from '../../store/useMapStore';
import { Layers, Square, MapPin, Trash2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { layers, toggleLayer, drawnFeatures, removeFeature } = useMapStore();

  // Safe date formatting function
  const formatDate = (date: any) => {
    if (!date) return 'Unknown date';

    try {
      // If it's already a Date object
      if (date instanceof Date) {
        return date.toLocaleDateString();
      }

      // If it's a string, try to parse it
      if (typeof date === 'string') {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate.toLocaleDateString();
        }
      }

      // If it's a timestamp
      if (typeof date === 'number') {
        return new Date(date).toLocaleDateString();
      }

      return 'Invalid date';
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date error';
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Layers size={20} className="text-blue-600" />
          Layers & Features
        </h2>
      </div>

      {/* Layer Controls */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Map Layers</h3>

        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-700">Satellite Imagery</span>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={layers.satellite}
                onChange={() => toggleLayer('satellite')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Square size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-700">Drawn Features</span>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={layers.drawnFeatures}
                onChange={() => toggleLayer('drawnFeatures')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Features List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Drawn Features ({drawnFeatures.length})
        </h3>

        {drawnFeatures.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Square size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No features drawn yet</p>
            <p className="text-xs mt-1">Use the toolbar to start drawing</p>
          </div>
        ) : (
          <div className="space-y-2">
            {drawnFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 group hover:bg-white hover:border-blue-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      feature.type === 'point'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {feature.type === 'point' ? (
                      <MapPin size={16} />
                    ) : (
                      <Square size={16} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {feature.properties.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {feature.type} •{' '}
                      {formatDate(feature.properties.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFeature(feature.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                  title="Delete feature"
                >
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
