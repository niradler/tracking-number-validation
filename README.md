## tracking-number-validation

A simple way to validate tracking number for the following couriers.

supported couriers:

- ups
- usps
- dhl
- fedex
- ontrac

## Updates
v2 api changes.
checkout out v1 and v2 branches.

v2 api:

- getCourier(tracking) -> Array: [courier] //due to the similarity some times there is a match for more then 1 courier
- getCourierOne: (tracking,courier) -> String: courier //not safe
- isCourier: (tracking,courier) -> Boolean: true/false
- getTrackingUrl: (tracking,courier) -> String: url for tracking number.

## Usage

Nodejs:

- npm i tracking-number-validation --save
- const tnv = require('tracking-number-validation')
- tnv.getCourier('1Z2869Y60397722027') -> return courier like ups
- tnv.isValid('1Z2869Y60397722027','fedex') -> return true/false

Javascript:

- npm i tracking-number-validation --save
- include main.js in your index.html
```html
<script src="node_modules/tracking-number-validation/dist/main.js"></script>
```
- var courier = TNV.getCourier(tr)

### Demo

[link](https://niradler.github.io/tracking-number-validation/)

<<<<<<< HEAD
### Tested Against
=======
## Updates

v2 is coming soon with api changes.
checkout v1 and v2 branches.

v2 api:

- getCourier(tracking) -> Array: [courier] //due to the similarity some times there is a match for more then 1 courier
- getCourierOne: (tracking,courier) -> String: courier //not safe
- isCourier: (tracking,courier) -> Boolean: true/false
- getTrackingUrl: (tracking,courier) -> String: url for tracking number.

## Tested against
>>>>>>> b568198bdc77b761948ba958edcd80329e4c5a9d

UPS:

- "1Z9999W99999999999": "ups",
- "1Z12345E1512345676": "ups",
- "1Z12345E0205271688": "ups",
- "1Z12345E6605272234": "ups",
- "1Z12345E0305271640": "ups",
- "1Z12345E0393657226": "ups",
- "1Z12345E1305277940": "ups",
- "1Z12345E6205277936": "ups",
- "1Z12345E1505270452": "ups",
- "1Z648616E192760718": "ups",
- "1ZWX0692YP40636269": "ups",
- T9999999999: "ups",

FEDEX:

- "9999 9999 9999": "fedex",
- "9999 9999 9999 999": "fedex",
- "999999999999": "fedex",
- "999999999999999": "fedex",
- "661377569221": "fedex",
- "624893691092": "fedex",
- "61299995669352455464": "fedex",
- "61299995669151880177": "fedex",

USPS:

- "9400 1000 0000 0000 0000 00": "usps",
- "9205 5000 0000 0000 0000 00": "usps",
- "9407 3000 0000 0000 0000 00": "usps",
- "9303 3000 0000 0000 0000 00": "usps",
- "82 000 000 00": "usps",
- "EC 000 000 000 US": "usps",
- "9270 1000 0000 0000 0000 00": "usps",
- "EA 000 000 000 US": "usps",
- "CP 000 000 000 US": "usps",
- "9208 8000 0000 0000 0000 00": "usps",
- "9202 1000 0000 0000 0000 00": "usps",
- "9400100000000000000000": "usps",
- "9205500000000000000000": "usps",
- "9407300000000000000000": "usps",
- "9303300000000000000000": "usps",
- "8200000000": "usps",
- EC000000000US: "usps",
- "9270100000000000000000": "usps",
- EA000000000US: "usps",
- CP000000000US: "usps",
- "9208800000000000000000": "usps",
- "9202100000000000000000": "usps",
- "92748963438592543475924253": "usps",

ONTRAC:

- C00000000000000: "ontrac",
- C99999999999999: "ontrac",

DHL:

- "125-12345678": "dhl",
- "125 12345678": "dhl",
- "12512345678": "dhl",
- SEA1234567: "dhl",
- LAX1234567: "dhl",