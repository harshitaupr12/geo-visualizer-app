import { describe, it, expect } from 'vitest';
import { calculateArea, calculateDistance } from '../utils/geometry';

describe('Geometry Utilities', () => {
  describe('calculateArea', () => {
    it('should calculate area for triangle', () => {
      const coords = [
        [0, 0],
        [4, 0],
        [0, 3],
      ];
      const area = calculateArea(coords);
      expect(area).toBe(6);
    });

    it('should return 0 for less than 3 points', () => {
      const coords = [
        [0, 0],
        [1, 1],
      ];
      const area = calculateArea(coords);
      expect(area).toBe(0);
    });
  });

  describe('calculateDistance', () => {
    it('should return 0 for same coordinates', () => {
      const coord1: [number, number] = [52.52, 13.405];
      const coord2: [number, number] = [52.52, 13.405];
      const distance = calculateDistance(coord1, coord2);
      expect(distance).toBe(0);
    });
  });
});
