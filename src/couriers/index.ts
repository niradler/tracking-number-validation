import { CourierModule, ValidationResult } from './types';
import ups from './ups';
import fedex from './fedex';
import usps from './usps';
import amazon from './amazon';
import dhl from './dhl';
import chinaPost from './china-post';
import royalMail from './royal-mail';
import canadaPost from './canada-post';
import australiaPost from './australia-post';
import ontrac from './ontrac';
import lasership from './lasership';

export const couriers: CourierModule[] = [
  ups,
  fedex,
  amazon,
  dhl,
  chinaPost,
  royalMail,
  canadaPost,
  australiaPost,
  ontrac,
  lasership,
  usps, // Move USPS to end to avoid overly broad matches
];

export const courierMap = new Map<string, CourierModule>();
couriers.forEach(courier => {
  courierMap.set(courier.name, courier);
});

export function identifyCourier(trackingNumber: string): ValidationResult | null {
  const cleaned = trackingNumber.trim().toUpperCase();
  
  for (const courier of couriers) {
    for (const pattern of courier.config.patterns) {
      if (pattern.test(cleaned)) {
        const valid = courier.validate(cleaned);
        return {
          courier: courier.name,
          valid,
          tracking_url: courier.getTrackingUrl(cleaned)
        };
      }
    }
  }
  
  return null;
}

export function identifyAllCouriers(trackingNumber: string): ValidationResult[] {
  const cleaned = trackingNumber.trim().toUpperCase();
  const matches: ValidationResult[] = [];
  
  for (const courier of couriers) {
    for (const pattern of courier.config.patterns) {
      if (pattern.test(cleaned)) {
        const valid = courier.validate(cleaned);
        if (valid) {
        matches.push({
          courier: courier.name,
          valid,
          tracking_url: courier.getTrackingUrl(cleaned)
        });
        }
        break; // Only add each courier once
      }
    }
  }
  
  return matches;
}

export function getCourier(courierName: string): CourierModule | undefined {
  return courierMap.get(courierName);
}

export function getAllCouriers(): string[] {
  return couriers.map(courier => courier.name);
}

export function isValidTrackingNumber(trackingNumber: string, courierName?: string): boolean {
  if (courierName) {
    const courier = getCourier(courierName);
    return courier ? courier.validate(trackingNumber) : false;
  }
  
  const result = identifyCourier(trackingNumber);
  return result ? result.valid : false;
}

export function getTrackingUrl(trackingNumber: string, courierName?: string): string | null {
  if (courierName) {
    const courier = getCourier(courierName);
    return courier ? courier.getTrackingUrl(trackingNumber) : null;
  }
  
  const result = identifyCourier(trackingNumber);
  return result ? result.tracking_url : null;
}

export function getAllTrackingUrls(trackingNumber: string): { courier: string; url: string; valid: boolean }[] {
  const matches = identifyAllCouriers(trackingNumber);
  return matches.map(match => ({
    courier: match.courier,
    url: match.tracking_url,
    valid: match.valid
  }));
}

export function getPossibleCouriers(trackingNumber: string): string[] {
  const matches = identifyAllCouriers(trackingNumber);
  return matches.map(match => match.courier);
}

export function getValidCouriers(trackingNumber: string): string[] {
  const matches = identifyAllCouriers(trackingNumber);
  return matches.filter(match => match.valid).map(match => match.courier);
}

export { CourierModule, CourierConfig, ValidationResult, CourierName } from './types';
export { 
  ups, 
  fedex, 
  usps, 
  amazon, 
  dhl, 
  chinaPost, 
  royalMail, 
  canadaPost, 
  australiaPost,
  ontrac,
  lasership
};
