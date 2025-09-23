import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^[A-Z]{2}\d{9}CA$/i),  // S10 International
    new RegExp(/^\d{16}$/),  // Domestic 16 digit
    new RegExp(/^\d{13}$/),  // Alternative 13 digit
    new RegExp(/^[A-Z]\d{11}CA$/i),  // Expedited
  ],
  tracking_url: "https://www.canadapost-postescanada.ca/track-reperage/en#/details/",
  test_numbers: ["LM123456789CA", "5035144199183281", "1234567890123"],
  checksum: "none",
  notes: "16-digit domestic, S10 for international"
};

function validate(trackingNumber: string): boolean {
  const cleaned = trackingNumber.trim().toUpperCase();
  
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
  return config.tracking_url + trackingNumber.trim().toUpperCase();
}

const canadaPost: CourierModule = {
  name: CourierName.CANADA_POST,
  config,
  validate,
  getTrackingUrl
};

export default canadaPost;
