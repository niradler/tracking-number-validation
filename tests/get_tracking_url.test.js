const tracking_numbers = require('./tracking_numbers');
const tnv = require('../index');

test("getCourier", () => {
    for (const key in tracking_numbers) {
        const url = tnv.getTrackingUrl(key);
        
        expect(url.indexOf(tracking_numbers[key]) > -1).toBeTruthy();
    }
});
