const tnv = require("../index");

let courier = tnv.getCourier("TBA502887274000");
console.log("getCourier:", courier);
courier = tnv.getCourierOne("1Z2869Y60397722027");
console.log("getCourierOne:", courier);
courier = tnv.isCourier("1Z2869Y60397722027", "ups");
console.log("isCourier:", courier);
courier = tnv.isValid("1Z2869Y60397722027");
console.log("isValid:", courier);
courier = tnv.getTrackingUrl("1Z2869Y60397722027");
console.log("getTrackingUrl:", courier);
