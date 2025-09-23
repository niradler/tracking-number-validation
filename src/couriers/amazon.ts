import { CourierModule, CourierConfig, CourierName } from './types';
import { validateChecksum } from './utils';

const config: CourierConfig = {
  patterns: [
    new RegExp(/^TBA\d{12}$/),  // Amazon Logistics TBA
    new RegExp(/^TBC\d{12}$/),  // Amazon Logistics TBC
    new RegExp(/^TBM\d{12}$/),  // Amazon Logistics TBM
    new RegExp(/^TB[A-D]\d{12}$/),  // Amazon Logistics general
  ],
  tracking_url: "https://track.amazon.com/tracking/",
  test_numbers: ["TBA487064622000", "TBC000111222333"],
  checksum: "none",
  notes: "Only works within Amazon ecosystem, requires authentication"
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

const amazon: CourierModule = {
  name: CourierName.AMAZON,
  config,
  validate,
  getTrackingUrl
};

export default amazon;
