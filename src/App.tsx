import MapContainer from './components/map/MapContainer';
import Sidebar from './components/ui/Sidebar';
import Toolbar from './components/ui/Toolbar';
import SearchBar from './components/ui/SearchBar';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Geo Visualizer
            </h1>
          </div>
          <SearchBar />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Map Area */}
        <div className="flex-1 relative">
          <Toolbar />
          <MapContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
