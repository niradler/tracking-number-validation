import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^[A-Z]{2}\d{9}CN$/i),  // S10 International
    new RegExp(/^R[A-Z]\d{9}CN$/i),  // Registered mail
    new RegExp(/^E[A-Z]\d{9}CN$/i),  // EMS
    new RegExp(/^L[A-Z]\d{9}CN$/i),  // ePacket
    new RegExp(/^U[A-Z]\d{9}CN$/i),  // Unregistered (domestic only)
    new RegExp(/^CP\d{9}CN$/i),  // China Post
  ],
  tracking_url: "https://www.ems.com.cn/item/query?searchNumber=",
  test_numbers: ["EE123456789CN", "RR123456789CN", "LK123456789CN"],
  checksum: "mod11",
  notes: "E-series for EMS, R-series for registered, L-series for ePacket"
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

const chinaPost: CourierModule = {
  name: CourierName.CHINA_POST,
  config,
  validate,
  getTrackingUrl
};

export default chinaPost;
