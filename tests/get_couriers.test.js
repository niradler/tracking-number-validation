const tracking_numbers = require("./tracking_numbers");
const tnv = require("../index");

test("getCourier", () => {
  for (const key in tracking_numbers) {
    const courier = tnv.getCourier(key);

    expect(courier[0]).toBe(tracking_numbers[key]);
  }
});

test("getCourierOne", () => {
  for (const key in tracking_numbers) {
    const courier = tnv.getCourierOne(key);

    expect(courier).toBe(tracking_numbers[key]);
  }
});

