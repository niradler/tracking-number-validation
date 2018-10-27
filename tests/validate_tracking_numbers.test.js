const tracking_numbers = require('./tracking_numbers');
const tnv = require('../index');

test("Validate Courier", () => {
    for (const key in tracking_numbers) {
        const courier = tnv.isCourier(key,tracking_numbers[key]);
        expect(courier).toBe(true);
    }
});
