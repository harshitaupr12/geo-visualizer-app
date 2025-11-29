import { useState } from 'react';
import { SearchResult } from '../types/map';

export const useGeocoding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) return [];

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      return data.map((result: any) => ({
        display_name: result.display_name,
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        boundingbox: result.boundingbox,
      }));
    } catch (err) {
      setError('Failed to search location');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchLocation,
    isLoading,
    error,
  };
};
