const tnv = require("../dist/index");
const { CourierName } = tnv;

console.log("=== Basic Usage Examples ===");

const trackingNumbers = [
  "TBA502887274000",
  "1Z2869Y60397722027", 
  "1234567890",
  "420221619405510200827682825",
  "9405511206244433414964"
];

trackingNumbers.forEach(number => {
  console.log(`\n--- Tracking Number: ${number} ---`);
  
  console.log("getCourier:", tnv.getCourier(number));
  console.log("getCourierOne:", tnv.getCourierOne(number));
  console.log("isValid:", tnv.isValid(number));
  
  const trackingUrl = tnv.getTrackingUrl(number);
  if (trackingUrl) {
    console.log("getTrackingUrl:", trackingUrl);
  }
  
  console.log("getValidCouriersOnly:", tnv.getValidCouriersOnly(number));
  console.log("getAllPossibleCouriers:", tnv.getAllPossibleCouriers(number));
});

console.log("\n=== Advanced Features ===");

console.log("\nTesting specific courier validation:");
console.log("isCourier(UPS):", tnv.isCourier("1Z2869Y60397722027", CourierName.UPS));
console.log("isCourier(FedEx):", tnv.isCourier("1Z2869Y60397722027", CourierName.FEDEX));

console.log("\nGet all tracking URLs for a number:");
const allUrls = tnv.getAllTrackingUrlsForNumber("1Z2869Y60397722027");
console.log("getAllTrackingUrlsForNumber:", allUrls);

console.log("\nDetailed courier information:");
const detailedInfo = tnv.getDetailedCourierInfo("1Z2869Y60397722027");
console.log("getDetailedCourierInfo:", detailedInfo);

console.log("\n=== Generate Tracking Numbers ===");
try {
  console.log("Generate UPS:", tnv.generateTrackingNumber(CourierName.UPS));
  console.log("Generate FedEx:", tnv.generateTrackingNumber(CourierName.FEDEX));
  console.log("Generate USPS:", tnv.generateTrackingNumber(CourierName.USPS));
  console.log("Generate DHL:", tnv.generateTrackingNumber(CourierName.DHL));
  console.log("Generate Amazon:", tnv.generateTrackingNumber(CourierName.AMAZON));
  
  console.log("\nGenerate multiple tracking numbers:");
  console.log("Multiple USPS:", tnv.generateMultipleTrackingNumbers(CourierName.USPS, 3));
  
  console.log("\nAvailable courier formats:");
  console.log("Courier formats:", Object.keys(tnv.courierFormats));
  
  console.log("\nUsing CourierName enum values:");
  console.log("CourierName.UPS =", CourierName.UPS);
  console.log("CourierName.FEDEX =", CourierName.FEDEX);
  console.log("All enum values:", Object.values(CourierName));
} catch (error) {
  console.log("Error with generation:", error.message);
}
