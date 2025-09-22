import { trackingNumbers } from "./tracking_numbers.js";
import { getCourier, isCourier, isValid, getTrackingUrl, injectPatterns } from "../src/index.js";

describe('Tracking Number Validation', () => {
  test('all tracking numbers should be valid', () => {
    for (const trackingNumber in trackingNumbers) {
      expect(isValid(trackingNumber)).toBe(true);
    }
  });

  test('getCourier should return expected courier for each tracking number', () => {
    for (const [trackingNumber, expectedCourier] of Object.entries(trackingNumbers)) {
      const couriers = getCourier(trackingNumber);
      expect(couriers).toContain(expectedCourier);
    }
  });

  test('isCourier should work correctly', () => {
    for (const [trackingNumber, expectedCourier] of Object.entries(trackingNumbers)) {
      expect(isCourier(trackingNumber, expectedCourier)).toBe(true);
    }
  });

  test('getTrackingUrl should return valid URLs', () => {
    for (const [trackingNumber, courier] of Object.entries(trackingNumbers)) {
      const url = getTrackingUrl(trackingNumber, courier);
      expect(url).toBeTruthy();
      expect(url).toContain('http');
      expect(url).toContain(trackingNumber);
    }
  });

  test('injectPatterns should work correctly', () => {
    const result = injectPatterns('ups', /TEST\d{10}/);
    expect(result).toBe(true);
    
    // Test the injected pattern
    expect(isValid('TEST1234567890')).toBe(true);
    expect(getCourier('TEST1234567890')).toContain('ups');
  });

  test('should handle USPS barcodes starting with 95', () => {
    const usps95Number = "9500100000000000000000";
    expect(isValid(usps95Number)).toBe(true);
    expect(getCourier(usps95Number)).toContain('usps');
    expect(isCourier(usps95Number, 'usps')).toBe(true);
  });

  test('should validate new courier patterns', () => {
    // Test LaserShip
    expect(isValid('1LS123456789012')).toBe(true);
    expect(getCourier('1LS123456789012')).toContain('lasership');
    
    // Test Canada Post
    expect(isValid('RP123456789CA')).toBe(true);
    expect(getCourier('RP123456789CA')).toContain('canada_post');
  });
});
