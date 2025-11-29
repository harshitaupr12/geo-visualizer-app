import React from 'react';
import { useMapStore } from '../../store/useMapStore';
import { MapPin, Square, MousePointer2, RotateCcw } from 'lucide-react';

const Toolbar: React.FC = () => {
  const { selectedTool, setSelectedTool, drawnFeatures, clearAllFeatures } =
    useMapStore();

  const tools = [
    {
      id: 'pan' as const,
      icon: MousePointer2,
      label: 'Pan',
      color: 'text-gray-600',
      description: 'Navigate map',
    },
    {
      id: 'point' as const,
      icon: MapPin,
      label: 'Add Point',
      color: 'text-blue-600',
      description: 'Click to add points',
    },
    {
      id: 'polygon' as const,
      icon: Square,
      label: 'Draw Polygon',
      color: 'text-green-600',
      description: 'Click points, double-click to finish',
    },
  ];

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all drawn features?')) {
      clearAllFeatures();
    }
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[280px]">
      <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <Square size={16} className="text-blue-600" />
        Drawing Tools
      </h3>

      <div className="flex flex-col gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = selectedTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() =>
                setSelectedTool(tool.id === selectedTool ? null : tool.id)
              }
              className={`p-3 rounded-lg transition-all flex items-center justify-between group ${
                isActive
                  ? 'bg-blue-50 border border-blue-200 text-blue-600'
                  : 'hover:bg-gray-50 text-gray-600 border border-transparent'
              }`}
              title={tool.description}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isActive
                      ? 'bg-blue-100'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} className={tool.color} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{tool.label}</div>
                  <div className="text-xs text-gray-500">
                    {tool.description}
                  </div>
                </div>
              </div>

              {isActive && (
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected tool instructions */}
      {selectedTool && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-xs font-medium text-blue-800 mb-1">
            Active Tool:
          </div>
          <div className="text-sm text-blue-700">
            {tools.find((t) => t.id === selectedTool)?.description}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            Click anywhere to cancel
          </div>
        </div>
      )}

      {/* Clear button */}
      {drawnFeatures.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={handleClearAll}
            className="w-full p-2 rounded-lg transition-all flex items-center gap-2 justify-center hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300"
          >
            <RotateCcw size={16} />
            <span className="text-sm font-medium">Clear All Features</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
