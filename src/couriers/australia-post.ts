import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^[A-Z]{2}\d{9}AU$/i),  // S10 International
    new RegExp(/^TM[A-Z0-9]{21,25}$/i),  // Domestic letter tracking  
    new RegExp(/^\d{12}$/),  // Standard parcel
    new RegExp(/^[A-Z]{2}\d{8}[A-Z]{2}\d{7}$/i),  // Alternative format
  ],
  tracking_url: "https://auspost.com.au/mypost/track/#/details/",
  test_numbers: ["EE123456789AU", "TMABC12312345678900405092"],
  checksum: "mod11",
  notes: "TM-prefix for domestic letters with tracking"
};

function validate(trackingNumber: string): boolean {
  const cleaned = trackingNumber.trim().toUpperCase();
  
  // S10 International format with mod11 checksum
  if (/^[A-Z]{2}\d{9}AU$/i.test(cleaned)) {
    return validateChecksum(cleaned, 'mod11');
  }
  
  // TM format - no checksum validation
  if (/^TM[A-Z0-9]{21,25}$/i.test(cleaned)) {
    return true;
  }
  
  // Standard parcel - no checksum
  if (/^\d{12}$/.test(cleaned)) {
    return true;
  }
  
  // Alternative format - no checksum
  if (/^[A-Z]{2}\d{8}[A-Z]{2}\d{7}$/i.test(cleaned)) {
    return true;
  }
  
  return false;
}

function getTrackingUrl(trackingNumber: string): string {
  return config.tracking_url + trackingNumber.trim().toUpperCase();
}

const australiaPost: CourierModule = {
  name: CourierName.AUSTRALIA_POST,
  config,
  validate,
  getTrackingUrl
};

export default australiaPost;
