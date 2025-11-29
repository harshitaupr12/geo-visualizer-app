export interface MapState {
  center: [number, number];
  zoom: number;
  layers: {
    satellite: boolean;
    drawnFeatures: boolean;
  };
  drawnFeatures: Feature[];
  selectedTool: 'pan' | 'point' | 'polygon' | 'rectangle' | null;
  isLoading: boolean;
}

export interface Feature {
  id: string;
  type: 'point' | 'polygon' | 'rectangle';
  coordinates: any;
  properties: {
    name: string;
    description?: string;
    createdAt: Date;
  };
}

export interface SearchResult {
  display_name: string;
  lat: number;
  lon: number;
  boundingbox: [string, string, string, string];
}
