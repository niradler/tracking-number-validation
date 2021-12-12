const tracking_numbers = require("./tracking_numbers");
const tnv = require("../index");

test("getTrackingUrl", () => {
  for (const key in tracking_numbers) {
    const url = tnv.getTrackingUrl(key);

    if (tracking_numbers[key] === "amazon") {
      expect(url).toBe(null);
    } else {
      expect(url.indexOf(tracking_numbers[key]) > -1).toBeTruthy();
    }
  }
});
