## tracking-number-validation


A simple way to validate tracking number for the following couriers.

supported couriers:
- ups
- usps
- dhl
- fedex
- ontrac


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
