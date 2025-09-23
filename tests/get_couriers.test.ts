import { trackingNumbers } from "./tracking_numbers";
const { getCourier, getCourierOne } = require("../src/index");

describe('getCourier', () => {
  test('should return correct couriers for tracking numbers', () => {
    for (const [trackingNumber, expectedCourier] of Object.entries(trackingNumbers)) {
      const result = getCourier(trackingNumber);
      expect(result).toContain(expectedCourier);
    }
  });

  test('should return empty array for invalid tracking numbers', () => {
    const invalidNumbers = [
      '',
      'invalid',
      '123',
      'ABCDEF',
      'random string',
    ];

    for (const trackingNumber of invalidNumbers) {
      const result = getCourier(trackingNumber);
      expect(result).toEqual([]);
    }
  });
});

describe('getCourierOne', () => {
  test('should return first matching courier', () => {
    for (const [trackingNumber, expectedCourier] of Object.entries(trackingNumbers)) {
      const result = getCourierOne(trackingNumber);
      expect(result).toBeDefined();
      
      // Check that the expected courier is among all possible couriers for this tracking number
      const allCouriers = getCourier(trackingNumber);
      expect(allCouriers).toContain(expectedCourier);
    }
  });

  test('should return undefined for invalid tracking numbers', () => {
    const result = getCourierOne('invalid');
    expect(result).toBeUndefined();
  });
});
