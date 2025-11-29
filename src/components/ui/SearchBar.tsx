import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { setCenter, setZoom } = useMapStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      console.log('🔍 Direct search for:', query);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('📍 Search result:', data);

        if (data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);

          setCenter([lat, lon]);
          setZoom(12);

          // Success notification
          console.log('✅ Map moved to:', result.display_name);
        } else {
          console.log('❌ No results found for:', query);
          alert(`No locations found for "${query}"`);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setQuery('');
    }
  };

  return (
    <div className="relative w-80">
      <form onSubmit={handleSearch} className="relative" role="search">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search location and press Enter..."
            className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            disabled={isSearching}
            aria-label="Search for locations"
            aria-describedby="search-instructions"
          />

          {/* Search Button */}
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={isSearching ? 'Searching...' : 'Search location'}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div id="search-instructions" className="sr-only">
        Type a location name and press Enter or click the Search button to find
        it on the map.
      </div>

      {/* Simple search hint */}
      {query && (
        <div
          className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-500 text-center"
          role="status"
          aria-live="polite"
        >
          Press Enter or click Search to find location
        </div>
      )}
    </div>
  );
};

export default SearchBar;
