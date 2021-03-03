import FlatRateSpecial from './flatRateSpecial.js';
const baseSpecial = {
    name: '2 for $5.00',
    numberOfItems: 2,
    flatRate: 5.00
};

test('FlatRateSpecial can be constructed', () => {
    const special = new FlatRateSpecial(baseSpecial);
    expect(special.specialName).toEqual('2 for $5.00');
    expect(special.numberOfItems).toEqual(2);
    expect(special.flatRate).toEqual(5.00);
});


test('calculateDiscount returns the discount given a number of units to purchase and a base price', () => {
    const special = new FlatRateSpecial(baseSpecial);
    const numberOfUnits = 6;
    const basePrice = 3.00;
    expect(special.calculateDiscount(numberOfUnits, basePrice)).toEqual(3);
});
