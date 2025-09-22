import { trackingNumbers } from "./tracking_numbers.js";
import { isValid } from "../src/index.js";

describe('isValid', () => {
  test('should validate all tracking numbers', () => {
    for (const trackingNumber in trackingNumbers) {
      const result = isValid(trackingNumber);
      expect(result).toBe(true);
    }
  });

  test('should return false for invalid tracking numbers', () => {
    const invalidNumbers = [
      '',
      'invalid',
      '123',
      'ABCDEF',
      '1Z123',
      'random string',
    ];

    for (const trackingNumber of invalidNumbers) {
      const result = isValid(trackingNumber);
      expect(result).toBe(false);
    }
  });
});
