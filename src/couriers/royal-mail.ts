import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^[A-Z]{2}\d{9}GB$/i),  // S10 International - specific to GB
    new RegExp(/^X[A-Z]\d{9}GB$/i),  // Express services - specific to GB
    new RegExp(/^[A-Z]{2}\d{7}$/i),  // Domestic tracked (2 letters + 7 digits)
    new RegExp(/^[A-Z]\d{8}[A-Z]{2}$/i),  // Special Delivery format (letter+8digits+2letters)
  ],
  tracking_url: "https://www.royalmail.com/track-your-item#/tracking-results/",
  test_numbers: ["XF133641044GB", "AB123456789GB", "05029FF654D"],
  checksum: "mod11",
  notes: "R-series for registered, C-series for parcels, X-series for express"
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

const royalMail: CourierModule = {
  name: CourierName.ROYAL_MAIL,
  config,
  validate,
  getTrackingUrl
};

export default royalMail;
