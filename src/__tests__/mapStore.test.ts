import { describe, it, expect, beforeEach } from 'vitest';
import { useMapStore } from '../store/useMapStore';

describe('Map Store', () => {
  beforeEach(() => {
    useMapStore.setState({
      center: [51.1657, 10.4515],
      zoom: 6,
      layers: {
        satellite: true,
        drawnFeatures: true,
      },
      drawnFeatures: [],
      selectedTool: null,
      isLoading: false,
    });
  });

  it('should set center correctly', () => {
    const newCenter: [number, number] = [52.52, 13.405];
    useMapStore.getState().setCenter(newCenter);

    expect(useMapStore.getState().center).toEqual(newCenter);
  });

  it('should add feature correctly', () => {
    const feature = {
      type: 'point' as const,
      coordinates: [52.52, 13.405],
      properties: {
        name: 'Test Point',
        createdAt: new Date(),
      },
    };

    useMapStore.getState().addFeature(feature);

    const features = useMapStore.getState().drawnFeatures;
    expect(features).toHaveLength(1);
    expect(features[0].type).toBe('point');
    expect(features[0].properties.name).toBe('Test Point');
  });

  it('should toggle layers correctly', () => {
    const { toggleLayer } = useMapStore.getState();

    toggleLayer('satellite');
    expect(useMapStore.getState().layers.satellite).toBe(false);

    toggleLayer('drawnFeatures');
    expect(useMapStore.getState().layers.drawnFeatures).toBe(false);
  });
});
