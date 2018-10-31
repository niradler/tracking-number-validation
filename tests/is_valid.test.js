const tracking_numbers = require("./tracking_numbers");
const tnv = require("../index");

test("isValid", () => {
  for (const key in tracking_numbers) {
    const isValid = tnv.isValid(key);

    expect(isValid).toBe(true);
  }
});

