
import { CourierName } from './couriers/types';

export type SupportedCourier = CourierName;

interface GeneratorConfig {
  courier: SupportedCourier;
  format?: string;
  count?: number;
}

function generateRandomString(length: number, chars: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomDigits(length: number): string {
  return generateRandomString(length, '0123456789');
}

function generateRandomLetters(length: number): string {
  return generateRandomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

function generateRandomAlphanumeric(length: number): string {
  return generateRandomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
}

function calculateMod11Checksum(digits: string): string {
  const weights = [8, 6, 4, 2, 3, 5, 9, 7];
  let sum = 0;
  
  for (let i = 0; i < 8; i++) {
    const digitChar = digits[i];
    const weight = weights[i];
    if (!digitChar || weight === undefined) return '0';
    const digit = parseInt(digitChar);
    sum += digit * weight;
  }
  
  const remainder = sum % 11;
  let checkDigit = 11 - remainder;
  if (checkDigit === 10) checkDigit = 0;
  
  return checkDigit.toString();
}



function generateUPSNumber(): string {
  const shipperAccount = generateRandomAlphanumeric(6);
  const serviceType = generateRandomDigits(2);
  const packageId = generateRandomAlphanumeric(7);
  
  const baseNumber = `1Z${shipperAccount}${serviceType}${packageId}`;
  const checkDigit = generateRandomDigits(1);
  
  return baseNumber + checkDigit;
}

function generateFedExNumber(format: 'express' | 'ground' | 'smartpost' = 'express'): string {
  switch (format) {
    case 'express':
      return generateRandomDigits(12);
    case 'ground':
      return generateRandomDigits(15);
    case 'smartpost':
      return '96' + generateRandomDigits(20);
    default:
      return generateRandomDigits(12);
  }
}

function generateUSPSNumber(format: 'tracking' | 's10' | 'certified' = 'tracking'): string {
  switch (format) {
    case 'tracking':
      const prefix = ['91', '92', '93', '94', '95'][Math.floor(Math.random() * 5)];
      return prefix + generateRandomDigits(20);
    case 's10':
      const serviceType = generateRandomLetters(2);
      const serialNumber = generateRandomDigits(9);
      return `${serviceType}${serialNumber}US`;
    case 'certified':
      return '7' + generateRandomDigits(19);
    default:
      return generateUSPSNumber('tracking');
  }
}

function generateDHLNumber(format: 'express' | 'ecommerce' | 'global' = 'express'): string {
  switch (format) {
    case 'express':
      const prefix = Math.floor(Math.random() * 7) + 1;
      return prefix + generateRandomDigits(9);
    case 'ecommerce':
      const letters = generateRandomLetters(3);
      return letters + generateRandomDigits(7);
    case 'global':
      return 'GM' + generateRandomDigits(16);
    default:
      return generateDHLNumber('express');
  }
}

function generateS10Number(countryCode: string, withMod11: boolean = false): string {
  const serviceType = generateRandomLetters(2);
  const serialNumber = generateRandomDigits(8);
  
  if (withMod11) {
    const checkDigit = calculateMod11Checksum(serialNumber);
    return `${serviceType}${serialNumber}${checkDigit}${countryCode}`;
  } else {
    const extraDigit = generateRandomDigits(1);
    return `${serviceType}${serialNumber}${extraDigit}${countryCode}`;
  }
}

function generateRoyalMailNumber(): string {
  return generateS10Number('GB', true);
}

function generateChinaPostNumber(): string {
  const formats = ['EE', 'RR', 'LK', 'CP'];
  const format = formats[Math.floor(Math.random() * formats.length)];
  
  if (format === 'CP') {
    return `CP${generateRandomDigits(9)}CN`;
  } else {
    return generateS10Number('CN', true);
  }
}

function generateAustraliaPostNumber(format: 's10' | 'domestic' | 'tm' = 's10'): string {
  switch (format) {
    case 's10':
      return generateS10Number('AU', true);
    case 'domestic':
      return generateRandomDigits(12);
    case 'tm':
      return 'TM' + generateRandomAlphanumeric(Math.floor(Math.random() * 5) + 16);
    default:
      return generateS10Number('AU', true);
  }
}

function generateCanadaPostNumber(format: 's10' | 'domestic' = 's10'): string {
  switch (format) {
    case 's10':
      return generateS10Number('CA', false);
    case 'domestic':
      const length = Math.random() > 0.5 ? 16 : 13;
      return generateRandomDigits(length);
    default:
      return generateS10Number('CA', false);
  }
}

function generateAmazonNumber(): string {
  const prefixes = ['TBA', 'TBC', 'TBM', 'TBD'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return prefix + generateRandomDigits(12);
}

function generateOnTracNumber(): string {
  const prefix = Math.random() > 0.5 ? 'C' : 'D';
  return prefix + generateRandomDigits(14);
}

function generateLaserShipNumber(): string {
  const formats = ['1LS', 'LX', 'L'];
  const format = formats[Math.floor(Math.random() * formats.length)];
  
  switch (format) {
    case '1LS':
      return '1LS' + generateRandomDigits(Math.floor(Math.random() * 4) + 12);
    case 'LX':
      return 'LX' + generateRandomDigits(Math.floor(Math.random() * 3) + 8);
    default:
      return 'L' + generateRandomLetters(1) + generateRandomDigits(8);
  }
}


// Overload signatures for generateMultipleTrackingNumbers
export function generateMultipleTrackingNumbers(courier: SupportedCourier, count: number): string[];
export function generateMultipleTrackingNumbers(config: GeneratorConfig): string[];
export function generateMultipleTrackingNumbers(courierOrConfig: SupportedCourier | GeneratorConfig, count?: number): string[] {
  let config: GeneratorConfig;
  
  if (typeof courierOrConfig === 'string') {
    config = { courier: courierOrConfig, count: count || 1 };
  } else {
    config = courierOrConfig;
  }
  
  const { count: finalCount = 1 } = config;
  const numbers: string[] = [];
  
  for (let i = 0; i < finalCount; i++) {
    numbers.push(generateTrackingNumber(config));
  }
  
  return numbers;
}

export function generateTrackingNumberWithValidation(config: GeneratorConfig): string {
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    const trackingNumber = generateTrackingNumber(config);
    
    try {
      const { isValid } = require('./index');
      if (isValid(trackingNumber)) {
        return trackingNumber;
      }
    } catch (error) {
      console.warn('Validation failed, returning unvalidated number:', error);
      return trackingNumber;
    }
    
    attempts++;
  }
  
  throw new Error(`Failed to generate valid tracking number for ${config.courier} after ${maxAttempts} attempts`);
}

export const courierFormats = {
  [CourierName.UPS]: [],
  [CourierName.FEDEX]: ['express', 'ground', 'smartpost'],
  [CourierName.USPS]: ['tracking', 's10', 'certified'],
  [CourierName.DHL]: ['express', 'ecommerce', 'global'],
  [CourierName.ROYAL_MAIL]: [],
  [CourierName.CHINA_POST]: [],
  [CourierName.AUSTRALIA_POST]: ['s10', 'domestic', 'tm'],
  [CourierName.CANADA_POST]: ['s10', 'domestic'],
  [CourierName.AMAZON]: [],
  [CourierName.ONTRAC]: [],
  [CourierName.LASERSHIP]: []
} as const;

// Overload signatures for convenience
export function generateTrackingNumber(courier: SupportedCourier): string;
export function generateTrackingNumber(config: GeneratorConfig): string;
export function generateTrackingNumber(courierOrConfig: SupportedCourier | GeneratorConfig): string {
  if (typeof courierOrConfig === 'string') {
    return generateTrackingNumber({ courier: courierOrConfig });
  }
  return generateTrackingNumberImpl(courierOrConfig);
}

// Rename the original function to avoid conflict
function generateTrackingNumberImpl(config: GeneratorConfig): string {
  const { courier, format } = config;
  
  switch (courier) {
    case CourierName.UPS:
      return generateUPSNumber();
    case CourierName.FEDEX:
      return generateFedExNumber(format as 'express' | 'ground' | 'smartpost' | undefined);
    case CourierName.USPS:
      return generateUSPSNumber(format as 'tracking' | 's10' | 'certified' | undefined);
    case CourierName.DHL:
      return generateDHLNumber(format as 'express' | 'ecommerce' | 'global' | undefined);
    case CourierName.ROYAL_MAIL:
      return generateRoyalMailNumber();
    case CourierName.CHINA_POST:
      return generateChinaPostNumber();
    case CourierName.AUSTRALIA_POST:
      return generateAustraliaPostNumber(format as 's10' | 'domestic' | 'tm' | undefined);
    case CourierName.CANADA_POST:
      return generateCanadaPostNumber(format as 's10' | 'domestic' | undefined);
    case CourierName.AMAZON:
      return generateAmazonNumber();
    case CourierName.ONTRAC:
      return generateOnTracNumber();
    case CourierName.LASERSHIP:
      return generateLaserShipNumber();
    default:
      throw new Error(`Unsupported courier: ${courier}`);
  }
}
