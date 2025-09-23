export enum CourierName {
  UPS = 'ups',
  FEDEX = 'fedex',
  USPS = 'usps',
  AMAZON = 'amazon',
  DHL = 'dhl',
  CHINA_POST = 'china_post',
  ROYAL_MAIL = 'royal_mail',
  CANADA_POST = 'canada_post',
  AUSTRALIA_POST = 'australia_post',
  ONTRAC = 'ontrac',
  LASERSHIP = 'lasership'
}

export interface CourierConfig {
  patterns: RegExp[];
  tracking_url: string;
  test_numbers?: string[];
  checksum?: 'mod10' | 'mod7' | 'mod11' | 'none';
  notes?: string;
}

export interface CourierModule {
  name: CourierName | string; // Allow string for backward compatibility
  config: CourierConfig;
  validate: (trackingNumber: string) => boolean;
  getTrackingUrl: (trackingNumber: string) => string;
}

export interface ValidationResult {
  courier: string;
  valid: boolean;
  tracking_url: string;
}
