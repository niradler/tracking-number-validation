import tnv from './index'
test('getCourier', () => {
    const courier = tnv.getCourier('1Z2869Y60397722027')
    expect(courier).toBe('ups');
  });

  test('getCourier', () => {
    const courier_ups = tnv.isValid('1Z2869Y60397722027','ups')
    expect(courier_ups).toBe(true);
  });