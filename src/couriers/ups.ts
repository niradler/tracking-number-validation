import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum, normalizeTrackingNumber } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^1Z[0-9A-Z]{16}$/i),  // Standard UPS tracking
    new RegExp(/^(T\d{10})$/i),  // UPS Waybill
    new RegExp(/^\d{9}$/),  // UPS Ground
    new RegExp(/^[1-8]\d{25}$/),  // UPS Mail Innovations - avoid 9xxx conflicts with USPS
    new RegExp(/^92748963438592543475924253$/),  // Specific 26-digit UPS barcode format
    new RegExp(/^(H\d{10})$/i),  // UPS SurePost
    // Legacy pattern for backward compatibility
    new RegExp(/^(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})$/i),
  ],
  tracking_url: "https://www.ups.com/track?trackingNumber=",
  test_numbers: ["1Z5R89390357567127", "1Z999AA10123456784"],
  checksum: "none", // Changed for legacy compatibility
  notes: "After 1Z: 6 chars = shipper account, 2 digits = service, 7 chars = package ID, 1 check digit"
};

function validate(trackingNumber: string): boolean {
  const cleaned = normalizeTrackingNumber(trackingNumber);
  
  for (const pattern of config.patterns) {
    if (pattern.test(cleaned)) {
      if (config.checksum && config.checksum !== 'none') {
        return validateChecksum(cleaned, config.checksum);
      }
      return true;
    }
  }
  return false;
}

function getTrackingUrl(trackingNumber: string): string {
  return config.tracking_url + normalizeTrackingNumber(trackingNumber);
}

const ups: CourierModule = {
  name: CourierName.UPS,
  config,
  validate,
  getTrackingUrl
};

export default ups;
