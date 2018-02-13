test('it puts the lotion in the basket', () => {
  const basket = ['lotion'];
  expect(basket.indexOf('lotion')).toBe(0);
});

test('it throws an error', () => {
  expect(() => {
    throw new Error('Something went wrong.');
  }).toThrow();
});
