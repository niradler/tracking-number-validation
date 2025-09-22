import { getTrackingUrl } from "../src/index.js";

describe('getTrackingUrl', () => {
  test('should return correct UPS tracking URL without /mobile/', () => {
    const trackingNumber = "1Z9999W99999999999";
    const result = getTrackingUrl(trackingNumber, 'ups');
    expect(result).toBe("https://www.ups.com/track?trackingNumber=1Z9999W99999999999");
    expect(result).not.toContain('/mobile/');
  });

  test('should return correct tracking URLs for all couriers', () => {
    const testCases = [
      {
        trackingNumber: "1Z9999W99999999999",
        courier: 'ups' as const,
        expectedUrl: "https://www.ups.com/track?trackingNumber=1Z9999W99999999999"
      },
      {
        trackingNumber: "9400100000000000000000",
        courier: 'usps' as const,
        expectedUrl: "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=9400100000000000000000"
      },
      {
        trackingNumber: "999999999999",
        courier: 'fedex' as const,
        expectedUrl: "https://www.fedex.com/fedextrack/?tracknumbers=999999999999"
      },
      {
        trackingNumber: "TBA502887274000",
        courier: 'amazon' as const,
        expectedUrl: "https://track.amazon.com/tracking/TBA502887274000"
      },
      {
        trackingNumber: "1LS123456789012",
        courier: 'lasership' as const,
        expectedUrl: "https://www.lasership.com/track/1LS123456789012"
      },
      {
        trackingNumber: "RP123456789CA",
        courier: 'canada_post' as const,
        expectedUrl: "https://www.canadapost-postescanada.ca/track-reperage/en#/details/RP123456789CA"
      }
    ];

    for (const testCase of testCases) {
      const result = getTrackingUrl(testCase.trackingNumber, testCase.courier);
      expect(result).toBe(testCase.expectedUrl);
    }
  });

  test('should auto-detect courier when not specified', () => {
    const result = getTrackingUrl("1Z9999W99999999999");
    expect(result).toBe("https://www.ups.com/track?trackingNumber=1Z9999W99999999999");
  });

  test('should return null for invalid tracking numbers', () => {
    const result = getTrackingUrl("invalid");
    expect(result).toBeNull();
  });
});
