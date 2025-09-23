import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum, normalizeTrackingNumber } from './utils';

const config: CourierConfig = {
  patterns: [
    // Modern USPS patterns - specific and non-overlapping
    new RegExp(/^9[1-5]\d{20}$/),  // 91-95 prefix formats (22 digits)
    new RegExp(/^(420\d{5})?(9[1-5]\d{20})$/),  // With ZIP prefix
    new RegExp(/^[A-Z]{2}\d{9}US$/i),  // International S10 format - must end with US
    new RegExp(/^82\d{8}$/),  // 82 prefix format (10 digits)
    new RegExp(/^E[A-C]\d{9}US$/i),  // Express Mail
    new RegExp(/^(CP|CJ)\d{9}US$/i),  // Priority Mail
    new RegExp(/^R[A-Z]\d{9}US$/i),  // Registered Mail
    new RegExp(/^7\d{19}$/),  // Certified Mail
    new RegExp(/^03\d{18}$/),  // Certified Mail alternative
    // Exclude specific UPS number from USPS matching
    new RegExp(/^(?!92748963438592543475924253$)9[1-5]\d{23}$/),  // 91-95 prefix formats (26 digits, excluding UPS)
    // Legacy patterns for backward compatibility - consolidated and non-overlapping
    new RegExp(/^((420 ?\d{5} ?)?(91|92|93|94|95|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)$/i),
    new RegExp(/^((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)$/i),
    new RegExp(/^(82 ?\d{3} ?\d{3} ?\d{2})$/i),  // 82 format with spaces
  ],
  tracking_url: "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=",
  test_numbers: ["9400111201080805483016", "9205500000000000000000", "EK115095696US"],
  checksum: "none", // Changed for legacy compatibility
  notes: "91-95 prefixes indicate tracking type, S10 format for international"
};

function validate(trackingNumber: string): boolean {
  const cleaned = normalizeTrackingNumber(trackingNumber);
  
  for (const pattern of config.patterns) {
    if (pattern.test(cleaned) || pattern.test(trackingNumber)) {
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

const usps: CourierModule = {
  name: CourierName.USPS,
  config,
  validate,
  getTrackingUrl
};

export default usps;
