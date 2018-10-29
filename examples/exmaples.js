const tnv = require("../index");

let courier = tnv.getCourier("1Z2869Y60397722027");
console.log("courier", courier);
courier = tnv.getCourierOne("1Z2869Y60397722027");
console.log("courier", courier);
courier = tnv.isCourier("1Z2869Y60397722027", "ups");
console.log("courier", courier);
courier = tnv.getTrackingUrl("1Z2869Y60397722027");
console.log("courier", courier);
