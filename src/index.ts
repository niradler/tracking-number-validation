export interface CourierInfo {
  patterns: RegExp[];
  tracking_url: string;
}

export type CourierName = 
  | 'amazon'
  | 'lasership'
  | 'canada_post'
  | 'ups'
  | 'usps'
  | 'ontrac'
  | 'dhl'
  | 'fedex';

export interface CourierConfig {
  [key: string]: CourierInfo;
}

const courier_info: CourierConfig = {
  amazon: {
    patterns: [new RegExp(/^TB[A-D][0-9]{12}/)],
    tracking_url: "https://track.amazon.com/tracking/",
  },
  lasership: {
    patterns: [new RegExp(/\b(1LS\d{12})\b/i)],
    tracking_url: "https://www.lasership.com/track/",
  },
  canada_post: {
    patterns: [
      new RegExp(/\b([A-Z]{2}\d{9}CA)\b/i),
      new RegExp(/\b(\d{13})\b/),
    ],
    tracking_url: "https://www.canadapost-postescanada.ca/track-reperage/en#/details/",
  },
  ups: {
    patterns: [new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i)],
    tracking_url: "https://www.ups.com/track?trackingNumber="
  },
  usps: {
    patterns: [
      new RegExp(
        /\b((420 ?\d{5} ?)?(91|92|93|94|95|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i
      ),
      new RegExp(
        /\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i
      ),
      new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i),
    ],
    tracking_url: "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=",
  },
  ontrac: {
    patterns: [new RegExp(/\b(C\d{14})\b/i)],
    tracking_url: "http://www.ontrac.com/trackres.asp?tracking_number=",
  },
  dhl: {
    patterns: [
      new RegExp(
        /\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i
      ),
    ],
    tracking_url:
      "http://www.dhl.com/content/g0/en/express/tracking.shtml?brand=DHL&AWB=",
  },
  fedex: {
    patterns: [new RegExp(/\b(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3}|\d{15})?)\b/i)],
    tracking_url: "https://www.fedex.com/fedextrack/?tracknumbers="
  }
};

/**
 * Get all couriers that match the given tracking number
 * @param trackingNumber - The tracking number to validate
 * @returns Array of courier names that match the tracking number
 */
export const getCourier = (trackingNumber: string): CourierName[] =>
  Object.keys(courier_info).filter(
    (courier) => courier_info[courier]?.patterns.some((pattern) => pattern.test(trackingNumber))
  ) as CourierName[];

/**
 * Get the first courier that matches the given tracking number
 * @param trackingNumber - The tracking number to validate
 * @returns The first matching courier name or undefined
 */
export const getCourierOne = (trackingNumber: string): CourierName | undefined => getCourier(trackingNumber)[0];

/**
 * Check if a tracking number belongs to a specific courier
 * @param trackingNumber - The tracking number to validate
 * @param courier - The courier to check against
 * @returns True if the tracking number matches the courier pattern
 */
export const isCourier = (trackingNumber: string, courier: CourierName): boolean =>
  getCourier(trackingNumber).includes(courier.toLowerCase() as CourierName);

/**
 * Get the tracking URL for a tracking number
 * @param trackingNumber - The tracking number
 * @param courier - Optional specific courier name
 * @returns The tracking URL or null if no match found
 */
export const getTrackingUrl = (trackingNumber: string, courier?: CourierName): string | null => {
  if (courier && courier_info[courier.toLowerCase()]) {
    const courierInfo = courier_info[courier.toLowerCase()];
    return courierInfo ? courierInfo.tracking_url + trackingNumber : null;
  }
  
  const detectedCourier = getCourier(trackingNumber)[0];
  if (detectedCourier) {
    const courierInfo = courier_info[detectedCourier];
    return courierInfo?.tracking_url ? courierInfo.tracking_url + trackingNumber : null;
  }

  return null;
};

/**
 * Inject custom patterns for a courier
 * @param courier - The courier name
 * @param pattern - The regex pattern to add
 * @returns True if successful, false if courier doesn't exist
 */
export const injectPatterns = (courier: CourierName, pattern: string | RegExp): boolean => {
  if (!courier || !courier_info[courier.toLowerCase()]) {
    return false;
  }
  
  const courierInfo = courier_info[courier.toLowerCase()];
  if (!courierInfo) {
    return false;
  }
  
  const regexPattern = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  courierInfo.patterns.push(regexPattern);
  return true;
};

/**
 * Check if a tracking number is valid for any courier
 * @param trackingNumber - The tracking number to validate
 * @returns True if the tracking number matches any courier pattern
 */
export const isValid = (trackingNumber: string): boolean => getCourier(trackingNumber).length > 0;

/**
 * Get all available couriers and their information
 * @returns The courier configuration object
 */
export const getCouriers = (): CourierConfig => courier_info;

// Legacy compatibility object
export const TNV = {
  getCourier,
  getCourierOne,
  isCourier,
  getTrackingUrl,
  injectPatterns,
  isValid,
  couriers: courier_info,
  getCouriers,
};

// Default export for CommonJS compatibility
export default TNV;

// Browser global support
if (typeof window !== 'undefined') {
  (window as any).TNV = TNV;
}
