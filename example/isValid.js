const tnv = require("../index");

const courier_ups = tnv.isCourier("1Z2869Y60397722027", "ups");
const courier_fedex1 = tnv.isCourier("788716578687", "ups");
const courier_fedex2 = tnv.isCourier("788716578687", "fedex");
console.log(
  "courier_ups",
  courier_ups,
  "courier_fedex (is ups)",
  courier_fedex1,
  "courier_fedex (is fedex)",
  courier_fedex2
);
