import PercentDiscountSpecial from './percentDiscountSpecial.js';
const baseSpecial = {
    name: 'buy 2 get 1 50% off, limit 6',
    limit: 6,
    quantityNeededToTriggerSpecial: 2,
    quantityDiscounted: 1,
    percentageDiscount: 0.5
};

test('PercentDiscountSpecial can be constructed', () => {
    const special = new PercentDiscountSpecial(baseSpecial);
    expect(special.specialName).toEqual('buy 2 get 1 50% off, limit 6');
    expect(special.limit).toEqual(6);
    expect(special.quantityNeededToTriggerSpecial).toEqual(2);
    expect(special.quantityDiscounted).toEqual(1);
    expect(special.percentageDiscount).toEqual(0.5);
});

test('maximumDiscountedItems returns the maximum items that can be discounted by the special', () => {
    const special = new PercentDiscountSpecial(baseSpecial);
    expect(special.maximumDiscountedItems()).toEqual(2);
});

test('maximumDiscountedItems returns an arbitrarily high number when there is no limit', () => {
    const special = new PercentDiscountSpecial({...baseSpecial, limit: null});
    expect(special.maximumDiscountedItems()).toEqual(10000);
});

test('calculateDiscount returns the discount given a number of units to purchase and a base price when there is no limit', () => {
    const special = new PercentDiscountSpecial({...baseSpecial, limit: null});
    const numberOfUnits = 6;
    const basePrice = 1.00;
    expect(special.calculateDiscount(numberOfUnits, basePrice)).toEqual(1);
});

test('calculateDiscount returns the discount given a number of units to purchase and a base price when the number of units exceeds the limit', () => {
    const special = new PercentDiscountSpecial({...baseSpecial});
    const numberOfUnits = 10;
    const basePrice = 1.00;
    expect(special.calculateDiscount(numberOfUnits, basePrice)).toEqual(1);
});

test('calculateDiscount returns the discount given a number of units to purchase and a base price when the number of units is under the limit', () => {
    const special = new PercentDiscountSpecial({...baseSpecial});
    const numberOfUnits = 4;
    const basePrice = 1.00;
    expect(special.calculateDiscount(numberOfUnits, basePrice)).toEqual(0.5);
});