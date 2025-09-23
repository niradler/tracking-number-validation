import { 
  identifyCourier, 
  identifyAllCouriers,
  getCourier as getModularCourier, 
  getAllCouriers, 
  isValidTrackingNumber,
  getTrackingUrl as getModularTrackingUrl,
  getAllTrackingUrls,
  getPossibleCouriers,
  getValidCouriers,
  courierMap
} from './couriers';

export interface CourierInfo {
  patterns: RegExp[];
  tracking_url: string;
}

// Legacy courier info for backward compatibility
const courier_info: Record<string, CourierInfo> = {};

// Populate legacy courier_info from modular couriers
courierMap.forEach((courier, name) => {
  courier_info[name] = {
    patterns: courier.config.patterns,
    tracking_url: courier.config.tracking_url
  };
});

/**
 * Get all couriers that match the given tracking number
 * @param trackingNumber - The tracking number to validate
 * @returns Array of courier names that match the tracking number
 */
export const getCouriers = (trackingNumber: string): string[] => {
  return getPossibleCouriers(trackingNumber);
};

/**
 * Get the first courier that matches the given tracking number
 * @param trackingNumber - The tracking number to validate
 * @returns The first matching courier name or undefined
 */
export const getCourierOne = (trackingNumber: string): string | undefined => getCouriers(trackingNumber)[0];

/**
 * Check if a tracking number belongs to a specific courier
 * @param trackingNumber - The tracking number to validate
 * @param courier - The courier to check against
 * @returns True if the tracking number matches the courier pattern
 */
export const isCourier = (trackingNumber: string, courier: string): boolean => {
  const courierModule = getModularCourier(courier.toLowerCase());
  return courierModule ? courierModule.validate(trackingNumber) : false;
};

/**
 * Get the tracking URL for a tracking number
 * @param trackingNumber - The tracking number
 * @param courier - Optional specific courier name
 * @returns The tracking URL or null if no match found
 */
export const getTrackingUrl = (trackingNumber: string, courier?: string): string | null => {
  if (courier) {
    const courierModule = getModularCourier(courier.toLowerCase());
    return courierModule ? courierModule.getTrackingUrl(trackingNumber) : null;
  }
  
  return getModularTrackingUrl(trackingNumber);
};

/**
 * Inject custom patterns for a courier
 * @param courier - The courier name
 * @param pattern - The regex pattern to add
 * @returns True if successful, false if courier doesn't exist
 */
export const injectPatterns = (courier: string, pattern: string | RegExp): boolean => {
  const courierModule = getModularCourier(courier.toLowerCase());
  if (!courierModule) {
    return false;
  }
  
  const regexPattern = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  courierModule.config.patterns.push(regexPattern);
  
  const legacyCourierInfo = courier_info[courier.toLowerCase()];
  if (legacyCourierInfo) {
    legacyCourierInfo.patterns.push(regexPattern);
  }
  
  return true;
};

/**
 * Check if a tracking number is valid for any courier
 * @param trackingNumber - The tracking number to validate
 * @returns True if the tracking number matches any courier pattern
 */
export const isValid = (trackingNumber: string): boolean => isValidTrackingNumber(trackingNumber);

/**
 * Get all possible couriers that match the tracking number pattern (includes invalid matches)
 * @param trackingNumber - The tracking number to check
 * @returns Array of courier names that match the pattern
 */
export const getAllPossibleCouriers = (trackingNumber: string): string[] => {
  return getPossibleCouriers(trackingNumber);
};

/**
 * Get only the valid couriers for the tracking number
 * @param trackingNumber - The tracking number to validate
 * @returns Array of courier names that both match the pattern and validate the tracking number
 */
export const getValidCouriersOnly = (trackingNumber: string): string[] => {
  return getValidCouriers(trackingNumber);
};

/**
 * Get all tracking URLs for couriers that match the tracking number
 * @param trackingNumber - The tracking number
 * @returns Array of objects with courier, url, and validity information
 */
export const getAllTrackingUrlsForNumber = (trackingNumber: string): { courier: string; url: string; valid: boolean }[] => {
  return getAllTrackingUrls(trackingNumber);
};

/**
 * Get detailed information about all courier matches
 * @param trackingNumber - The tracking number to analyze
 * @returns Object with all matches and primary match information
 */
export const getDetailedCourierInfo = (trackingNumber: string): import('./couriers').ValidationResult[] => {
  return identifyAllCouriers(trackingNumber);
};

/**
 * Get all available couriers and their information
 * @returns The courier configuration object
 */
export const getAllCouriersInfo = (): Record<string, CourierInfo> => courier_info;

// Legacy compatibility object
const TNV = {
  getCourier: getCouriers,
  getCourierOne,
  isCourier,
  getTrackingUrl,
  injectPatterns,
  isValid,
  couriers: courier_info,
  getCouriers: getAllCouriersInfo,
};

// CommonJS exports
module.exports = TNV;
module.exports.getCourier = getCouriers;
module.exports.getCouriersArray = getCouriers;
module.exports.getCourierOne = getCourierOne;
module.exports.isCourier = isCourier;
module.exports.getTrackingUrl = getTrackingUrl;
module.exports.injectPatterns = injectPatterns;
module.exports.isValid = isValid;
module.exports.getCouriers = getAllCouriersInfo;
module.exports.getCouriersForTrackingNumber = getCouriers;
module.exports.default = TNV;

// Export modular API for CommonJS
module.exports.identifyCourier = identifyCourier;
module.exports.identifyAllCouriers = identifyAllCouriers;
module.exports.getAllCouriers = getAllCouriers;
module.exports.isValidTrackingNumber = isValidTrackingNumber;
module.exports.getAllTrackingUrls = getAllTrackingUrls;
module.exports.getPossibleCouriers = getPossibleCouriers;
module.exports.getValidCouriers = getValidCouriers;
module.exports.getAllPossibleCouriers = getAllPossibleCouriers;
module.exports.getValidCouriersOnly = getValidCouriersOnly;
module.exports.getAllTrackingUrlsForNumber = getAllTrackingUrlsForNumber;
module.exports.getDetailedCourierInfo = getDetailedCourierInfo;
module.exports.courierMap = courierMap;

// Export individual courier modules
import * as courierModules from './couriers';
module.exports.ups = courierModules.ups;
module.exports.fedex = courierModules.fedex;
module.exports.usps = courierModules.usps;
module.exports.amazon = courierModules.amazon;
module.exports.dhl = courierModules.dhl;
module.exports.chinaPost = courierModules.chinaPost;
module.exports.royalMail = courierModules.royalMail;
module.exports.canadaPost = courierModules.canadaPost;
module.exports.australiaPost = courierModules.australiaPost;
module.exports.ontrac = courierModules.ontrac;
module.exports.lasership = courierModules.lasership;

// Export generator functions for CommonJS
import { 
  generateTrackingNumber, 
  generateMultipleTrackingNumbers, 
  generateTrackingNumberWithValidation,
  courierFormats
} from './generate-tracking';

module.exports.generateTrackingNumber = generateTrackingNumber;
module.exports.generateMultipleTrackingNumbers = generateMultipleTrackingNumbers;
module.exports.generateTrackingNumberWithValidation = generateTrackingNumberWithValidation;
module.exports.courierFormats = courierFormats;

// Export CourierName enum for CommonJS
import { CourierName } from './couriers/types';
module.exports.CourierName = CourierName;

export { 
  identifyCourier, 
  identifyAllCouriers,
  getAllCouriers, 
  isValidTrackingNumber,
  getAllTrackingUrls,
  getPossibleCouriers,
  getValidCouriers,
  courierMap,
  CourierModule,
  CourierConfig,
  ValidationResult,
  CourierName
} from './couriers';

// Keep the legacy getCourier export with the original name for backward compatibility
export const getCourier = getCouriers;

// Export the generator functions
export { 
  generateTrackingNumber, 
  generateMultipleTrackingNumbers, 
  generateTrackingNumberWithValidation,
  courierFormats,
  type SupportedCourier
} from './generate-tracking';

if (typeof window !== 'undefined') {
  (window as unknown as { TNV: typeof TNV }).TNV = TNV;
}
