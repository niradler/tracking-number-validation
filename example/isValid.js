const tnv = require('../index')

const courier_ups = tnv.default.isValid('1Z2869Y60397721027','ups')
const courier_fedex1 = tnv.default.isValid('788716579687','ups')
const courier_fedex2 = tnv.default.isValid('788716579687','fedex')
console.log('courier_ups',courier_ups,'courier_fedex (is ups)',courier_fedex1,'courier_fedex (is fedex)',courier_fedex2)