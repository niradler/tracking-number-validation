import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^1LS\d{12,15}$/i),  // LaserShip standard
    new RegExp(/^LX\d{8,10}$/i),  // LaserShip LX format
    new RegExp(/^L[A-Z]\d{8}$/i),  // LaserShip alternative
  ],
  tracking_url: "https://www.lasership.com/track/",
  test_numbers: ["1LS123456789012", "LX12345678"],
  checksum: "none",
  notes: "Now merged with OnTrac"
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

const lasership: CourierModule = {
  name: CourierName.LASERSHIP,
  config,
  validate,
  getTrackingUrl
};

export default lasership;
