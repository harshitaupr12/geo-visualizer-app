import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MapState, Feature } from '../types/map';

interface MapStore extends MapState {
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  toggleLayer: (layer: keyof MapState['layers']) => void;
  addFeature: (feature: Omit<Feature, 'id'>) => void;
  removeFeature: (id: string) => void;
  setSelectedTool: (tool: MapState['selectedTool']) => void;
  setLoading: (loading: boolean) => void;
  clearAllFeatures: () => void;
}

export const useMapStore = create<MapStore>()(
  persist(
    (set) => ({
      // Initial state - Centered on NRW region for better satellite imagery
      center: [51.478, 7.555], // NRW region center
      zoom: 10, // Closer zoom to see satellite details
      layers: {
        satellite: true,
        drawnFeatures: true,
      },
      drawnFeatures: [],
      selectedTool: null,
      isLoading: false,

      // Actions
      setCenter: (center) => set({ center }),
      setZoom: (zoom) => set({ zoom }),
      toggleLayer: (layer) =>
        set((state) => ({
          layers: { ...state.layers, [layer]: !state.layers[layer] },
        })),
      addFeature: (feature) =>
        set((state) => ({
          drawnFeatures: [
            ...state.drawnFeatures,
            {
              ...feature,
              id: Date.now().toString(),
            },
          ],
        })),
      removeFeature: (id) =>
        set((state) => ({
          drawnFeatures: state.drawnFeatures.filter((f) => f.id !== id),
        })),
      setSelectedTool: (selectedTool) => set({ selectedTool }),
      setLoading: (isLoading) => set({ isLoading }),
      clearAllFeatures: () => set({ drawnFeatures: [] }),
    }),
    {
      name: 'map-storage',
      partialize: (state) => ({
        drawnFeatures: state.drawnFeatures,
        layers: state.layers,
      }),
    }
  )
);
