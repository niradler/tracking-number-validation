import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum, normalizeTrackingNumber } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^\d{12}$/),  // FedEx Express (12 digits)
    new RegExp(/^\d{15}$/),  // FedEx Ground (15 digits)
    new RegExp(/^\d{20}$/),  // SmartPost
    new RegExp(/^96\d{20}$/),  // FedEx SmartPost
    new RegExp(/^96\d{32}$/),  // FedEx SmartPost extended
    new RegExp(/^100\d{31}$/),  // FedEx additional format
    new RegExp(/^\d{18}$/),  // Alternative format
    new RegExp(/^(DT\d{12})$/i),  // Door Tag
    // Legacy patterns for backward compatibility
    new RegExp(/^(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3}|\d{15})?)$/i),
  ],
  tracking_url: "https://www.fedex.com/fedextrack/?tracknumbers=",
  test_numbers: ["986578788855", "041441760228964", "961290448662710"],
  checksum: "none", // Changed from mod10 for legacy compatibility
  notes: "Express uses 12 digits, Ground 15-18, SmartPost starts with 96"
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
  // For backward compatibility, preserve original format in URL if it matches patterns
  const cleaned = trackingNumber.trim().toUpperCase();
  for (const pattern of config.patterns) {
    if (pattern.test(cleaned)) {
      return config.tracking_url + cleaned;
    }
  }
  // Fall back to normalized version
  return config.tracking_url + normalizeTrackingNumber(trackingNumber);
}

const fedex: CourierModule = {
  name: CourierName.FEDEX,
  config,
  validate,
  getTrackingUrl
};

export default fedex;
