const tracking_numbers = require("./tracking_numbers");
const tnv = require("../index");

test("getCourier", () => {
  for (const key in tracking_numbers) {
    const courier = tnv.getCourier(key);

    expect(courier[0]).toBe(tracking_numbers[key]);
  }
});
