export function validateMod10(tracking: string): boolean {
  const digits = tracking.replace(/\D/g, '');
  if (digits.length === 0) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 2; i >= 0; i--) {
    const digitChar = digits[i];
    if (!digitChar) continue;
    
    let digit = parseInt(digitChar);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  
  const lastDigitChar = digits[digits.length - 1];
  if (!lastDigitChar) return false;
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(lastDigitChar);
}

export function validateMod7(tracking: string): boolean {
  const digits = tracking.replace(/\D/g, '');
  if (digits.length < 10) return false;
  
  const sum = digits.slice(0, -1).split('').reduce((acc, d) => acc + parseInt(d), 0);
  const checkDigit = sum % 7;
  const lastDigitChar = digits[digits.length - 1];
  if (!lastDigitChar) return false;
  
  return checkDigit === parseInt(lastDigitChar);
}

export function validateMod11(tracking: string): boolean {
  const match = tracking.match(/^[A-Z]{2}(\d{8})(\d)[A-Z]{2}$/i);
  if (!match) return false;
  
  const weights = [8, 6, 4, 2, 3, 5, 9, 7];
  const digits = match[1];
  const checkDigitStr = match[2];
  
  if (!digits || !checkDigitStr) return false;
  
  const checkDigit = parseInt(checkDigitStr);
  
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    const digitChar = digits[i];
    const weight = weights[i];
    if (!digitChar || weight === undefined) return false;
    sum += parseInt(digitChar) * weight;
  }
  
  const remainder = sum % 11;
  let expected = 11 - remainder;
  if (expected === 10) expected = 0;
  if (expected === 11) expected = 5;
  
  return expected === checkDigit;
}

export function validateChecksum(trackingNumber: string, type: 'mod10' | 'mod7' | 'mod11' | 'none'): boolean {
  switch(type) {
    case 'mod10':
      return validateMod10(trackingNumber);
    case 'mod7':
      return validateMod7(trackingNumber);
    case 'mod11':
      return validateMod11(trackingNumber);
    case 'none':
    default:
      return true;
  }
}

export function normalizeTrackingNumber(trackingNumber: string): string {
  return trackingNumber.trim().replace(/[\s-]/g, '').toUpperCase();
}
