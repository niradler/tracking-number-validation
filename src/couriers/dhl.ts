import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum, normalizeTrackingNumber } from './utils';

const config: CourierConfig = {
  patterns: [
    // Specific DHL patterns to avoid conflicts
    new RegExp(/^[A-Z]{3}\d{7}$/i),  // DHL eCommerce (3 letters + 7 digits)
    new RegExp(/^[A-Z]{2}\d{16,18}$/i),  // DHL eCommerce GM format
    new RegExp(/^GM\d{16}$/),  // DHL Global Mail
    new RegExp(/^J[A-Z]{2}\d{10}$/i),  // DHL Global Forwarding
    new RegExp(/^\d{4}[- ]\d{4}[- ]\d{2}$/),  // DHL formatted - require separators
    new RegExp(/^[1-7]\d{9}$/),  // DHL Express (10 digits) - avoid 8xxx and 9xxx
    new RegExp(/^[1-7]\d{10}$/),  // DHL Express extended (11 digits)
    // Legacy pattern - consolidated to avoid duplicates
    new RegExp(/^[1-7]\d{2}[- ]\d{8}$/),  // Legacy DHL with separators
  ],
  tracking_url: "http://www.dhl.com/content/g0/en/express/tracking.shtml?brand=DHL&AWB=",
  test_numbers: ["3318810025", "1234567890", "GM2951173225174494"],
  checksum: "none", // Changed for legacy compatibility
  notes: "Express uses mod7 checksum, eCommerce has various formats"
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
    if (pattern.test(cleaned) || pattern.test(trackingNumber)) {
      return config.tracking_url + cleaned;
    }
  }
  // Fall back to normalized version
  return config.tracking_url + normalizeTrackingNumber(trackingNumber);
}

const dhl: CourierModule = {
  name: CourierName.DHL,
  config,
  validate,
  getTrackingUrl
};

export default dhl;
