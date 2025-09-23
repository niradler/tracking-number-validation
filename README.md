# tracking-number-validation

A modern TypeScript library for validating tracking numbers from multiple shipping carriers.

## 🚀 Features

- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Modern ESM**: ES modules with CommonJS compatibility
- **Zero Dependencies**: Lightweight with no external dependencies
- **Comprehensive Testing**: Full test coverage with Jest
- **Multiple Carriers**: Support for 11+ shipping carriers

## 📦 Supported Carriers

- **UPS** - United Parcel Service
- **USPS** - United States Postal Service (including barcodes starting with 95)
- **FedEx** - Federal Express
- **DHL** - DHL Express
- **OnTrac** - OnTrac Shipping
- **Amazon** - Amazon Logistics
- **LaserShip** - LaserShip Delivery
- **Canada Post** - Canada Post Corporation
- **China Post** - China Post Corporation
- **Australia Post** - Australia Post Corporation
- **Royal Mail** - Royal Mail Group

## 🛠 Installation

```bash
# Using pnpm (recommended)
pnpm add tracking-number-validation

# Using npm
npm install tracking-number-validation

# Using yarn
yarn add tracking-number-validation
```

## 📖 Usage

### TypeScript/ES Modules

```typescript
import { 
  getCourier, 
  getCourierOne, 
  isValid, 
  isCourier, 
  getTrackingUrl,
  getAllPossibleCouriers,
  getValidCouriersOnly,
  getAllTrackingUrlsForNumber,
  getDetailedCourierInfo,
  generateTrackingNumber,
  generateMultipleTrackingNumbers,
  type CourierName 
} from 'tracking-number-validation';

// Get all matching couriers for a tracking number
const couriers = getCourier('1Z9999W99999999999');
console.log(couriers); // ['ups']

// Get the first matching courier
const courier = getCourierOne('1Z9999W99999999999');
console.log(courier); // 'ups'

// Check if tracking number is valid
const isValidNumber = isValid('1Z9999W99999999999');
console.log(isValidNumber); // true

// Check if tracking number belongs to specific courier
const isUPS = isCourier('1Z9999W99999999999', 'ups');
console.log(isUPS); // true

// Get tracking URL
const trackingUrl = getTrackingUrl('1Z9999W99999999999', 'ups');
console.log(trackingUrl); // 'https://www.ups.com/track?trackingNumber=1Z9999W99999999999'

// Auto-detect courier and get URL
const autoUrl = getTrackingUrl('1Z9999W99999999999');
console.log(autoUrl); // 'https://www.ups.com/track?trackingNumber=1Z9999W99999999999'

// Get all possible couriers (including pattern matches that may not validate)
const allPossible = getAllPossibleCouriers('1Z9999W99999999999');
console.log(allPossible); // ['ups']

// Get only validated couriers
const validOnly = getValidCouriersOnly('1Z9999W99999999999');
console.log(validOnly); // ['ups']

// Get detailed validation info
const detailedInfo = getDetailedCourierInfo('1Z9999W99999999999');
console.log(detailedInfo); // [{ courier: 'ups', valid: true, tracking_url: '...' }]

// Generate tracking numbers
const generatedUPS = generateTrackingNumber('ups');
console.log(generatedUPS); // '1Z12345E1512345676'

// Generate multiple tracking numbers
const multipleUSPS = generateMultipleTrackingNumbers('usps', 3);
console.log(multipleUSPS); // ['9400100000000000000000', '9400100000000000000001', ...]
```

### CommonJS

```javascript
const { 
  getCourier, 
  isValid, 
  getTrackingUrl,
  generateTrackingNumber,
  CourierName 
} = require('tracking-number-validation');

const courier = getCourier('9400100000000000000000');
console.log(courier); // ['usps']
```

### Browser (Global)

```html
<script src="https://unpkg.com/tracking-number-validation@3.0.0/dist/index.global.js"></script>
<script>
  const courier = TNV.getCourier('1Z9999W99999999999');
  console.log(courier); // ['ups']
</script>
```

## 🔧 API Reference

### `getCourier(trackingNumber: string): CourierName[]`

Returns an array of courier names that match the tracking number pattern.

```typescript
getCourier('1Z9999W99999999999'); // ['ups']
getCourier('invalid'); // []
```

### `getCourierOne(trackingNumber: string): CourierName | undefined`

Returns the first matching courier name or `undefined` if no match.

```typescript
getCourierOne('1Z9999W99999999999'); // 'ups'
getCourierOne('invalid'); // undefined
```

### `isValid(trackingNumber: string): boolean`

Checks if the tracking number is valid for any supported courier.

```typescript
isValid('1Z9999W99999999999'); // true
isValid('invalid'); // false
```

### `isCourier(trackingNumber: string, courier: CourierName): boolean`

Checks if the tracking number belongs to a specific courier.

```typescript
isCourier('1Z9999W99999999999', 'ups'); // true
isCourier('1Z9999W99999999999', 'fedex'); // false
```

### `getTrackingUrl(trackingNumber: string, courier?: CourierName): string | null`

Returns the tracking URL for the given tracking number and courier.

```typescript
getTrackingUrl('1Z9999W99999999999', 'ups'); 
// 'https://www.ups.com/track?trackingNumber=1Z9999W99999999999'

getTrackingUrl('1Z9999W99999999999'); // Auto-detects UPS
// 'https://www.ups.com/track?trackingNumber=1Z9999W99999999999'
```

### `injectPatterns(courier: CourierName, pattern: string | RegExp): boolean`

Adds a custom pattern for an existing courier.

```typescript
injectPatterns('ups', /CUSTOM\d{10}/); // true
isValid('CUSTOM1234567890'); // true (now matches UPS)
```

### `getAllPossibleCouriers(trackingNumber: string): string[]`

Returns all couriers that match the tracking number pattern (including those that may not validate).

```typescript
getAllPossibleCouriers('1Z9999W99999999999'); // ['ups']
getAllPossibleCouriers('invalid'); // []
```

### `getValidCouriersOnly(trackingNumber: string): string[]`

Returns only the couriers that both match the pattern and validate the tracking number.

```typescript
getValidCouriersOnly('1Z9999W99999999999'); // ['ups']
getValidCouriersOnly('invalid'); // []
```

### `getAllTrackingUrlsForNumber(trackingNumber: string): object[]`

Returns tracking URLs for all matching couriers with validation information.

```typescript
getAllTrackingUrlsForNumber('1Z9999W99999999999');
// [{ courier: 'ups', url: 'https://...', valid: true }]
```

### `getDetailedCourierInfo(trackingNumber: string): ValidationResult[]`

Returns comprehensive validation information for all matching couriers.

```typescript
getDetailedCourierInfo('1Z9999W99999999999');
// [{ courier: 'ups', valid: true, tracking_url: 'https://...' }]
```

### `generateTrackingNumber(courier: CourierName): string`

Generates a valid-format tracking number for the specified courier.

```typescript
generateTrackingNumber('ups'); // '1Z12345E1512345676'
generateTrackingNumber('fedex'); // '999999999999'
```

### `generateMultipleTrackingNumbers(courier: CourierName, count: number): string[]`

Generates multiple tracking numbers for the specified courier.

```typescript
generateMultipleTrackingNumbers('usps', 3);
// ['9400100000000000000000', '9400100000000000000001', '9400100000000000000002']
```

### `generateTrackingNumberWithValidation(config: GeneratorConfig): string`

Generates a tracking number and validates it against the library's own validation rules.

```typescript
generateTrackingNumberWithValidation({ courier: 'ups' });
// '1Z12345E1512345676' (guaranteed to pass isValid())
```

## 📝 Tracking Number Examples

### UPS
- `1Z9999W99999999999`
- `1Z12345E1512345676`
- `T9999999999`

### USPS
- `9400 1000 0000 0000 0000 00`
- `9205 5000 0000 0000 0000 00` 
- `9500 1000 0000 0000 0000 00` (95 prefix supported)
- `EC 000 000 000 US`
- `82 000 000 00`

### FedEx
- `9999 9999 9999`
- `9999 9999 9999 999`
- `999999999999`
- `61299995669352455464`

### DHL
- `125-12345678`
- `125 12345678`
- `SEA1234567`

### OnTrac
- `C00000000000000`

### Amazon
- `TBA502887274000`

### LaserShip
- `1LS123456789012`

### Canada Post
- `RP123456789CA`
- `1234567890123`

### China Post
- `EE123456789CN`
- `RR123456789CN`
- `CP123456789CN`

### Australia Post
- `AP123456789AU`
- `123456789012`
- `TM123456789012345`

### Royal Mail
- `GB123456789GB`
- `RR123456789GB`

## 🎲 Tracking Number Generation

Generate valid tracking numbers for testing purposes:

```typescript
import { generateTrackingNumber, generateMultipleTrackingNumbers, CourierName } from 'tracking-number-validation';

// Generate single tracking numbers
const upsNumber = generateTrackingNumber(CourierName.UPS);
const fedexNumber = generateTrackingNumber(CourierName.FEDEX);
const uspsNumber = generateTrackingNumber(CourierName.USPS);

// Generate multiple tracking numbers
const multipleNumbers = generateMultipleTrackingNumbers(CourierName.UPS, 5);
console.log(multipleNumbers); // ['1Z...', '1Z...', '1Z...', '1Z...', '1Z...']

// Generate with specific formats (where supported)
const fedexGround = generateTrackingNumber({ 
  courier: CourierName.FEDEX, 
  format: 'ground' 
});

// Available formats per courier
import { courierFormats } from 'tracking-number-validation';
console.log(courierFormats[CourierName.FEDEX]); // ['express', 'ground', 'smartpost']
console.log(courierFormats[CourierName.USPS]); // ['tracking', 's10', 'certified']
```

### Supported Generation Formats

- **FedEx**: `express` (12 digits), `ground` (15 digits), `smartpost` (22 digits)
- **USPS**: `tracking` (22 digits), `s10` (13 chars), `certified` (20 digits)
- **DHL**: `express` (10 digits), `ecommerce` (10 chars), `global` (18 chars)
- **Australia Post**: `s10`, `domestic`, `tm`
- **Canada Post**: `s10`, `domestic`
- **UPS, Amazon, OnTrac, LaserShip, China Post, Royal Mail**: Default formats only

## 🆕 What's New in v3.0.0

### ✨ Major Updates
- **Full TypeScript rewrite** with comprehensive type definitions
- **Modern ESM support** with CommonJS compatibility
- **Updated UPS tracking URLs** (removed deprecated `/mobile/` path)
- **Enhanced USPS support** for barcodes starting with 95
- **New carriers added**: LaserShip, Canada Post, China Post, Australia Post, and Royal Mail
- **Tracking number generation**: Generate valid tracking numbers for testing
- **Advanced validation functions**: Get detailed courier information and validation results

### 🔧 Breaking Changes
- Minimum Node.js version: 16+
- Full TypeScript types required
- ES modules by default
- Updated build system using `tsup`

### 🛠 Development Improvements
- Modern Jest testing with TypeScript
- ESLint configuration for TypeScript
- Comprehensive test coverage
- Updated documentation and examples

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/niradler/tracking-number-validation.git
cd tracking-number-validation

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the project
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/niradler/tracking-number-validation)
- [NPM Package](https://www.npmjs.com/package/tracking-number-validation)
- [Issue Tracker](https://github.com/niradler/tracking-number-validation/issues)

## 📊 Version History

### v3.0.0 (Latest)

- Complete TypeScript rewrite
- Added 5 new carriers: LaserShip, Canada Post, China Post, Australia Post, and Royal Mail
- Tracking number generation capabilities
- Advanced validation and courier detection functions
- Fixed UPS tracking URLs
- Enhanced USPS barcode support (95 prefix)
- Modern ESM build system

### v2.0.2
- Legacy JavaScript version
- Basic courier support
