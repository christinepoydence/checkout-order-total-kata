import PercentDiscountSpecial from './percentDiscountSpecial.js';
import ScannableItem from './scannableItem.js';

const item = {
    itemName: 'kiwi',
    unitType: 'ounces',
    price: 1.42
};

const baseSpecial = {
    name: 'buy 2 get 1 50% off, limit 6',
    limit: 6,
    quantityNeededToTriggerSpecial: 2,
    quantityDiscounted: 1,
    percentageDiscount: 0.5
};

const special =  new PercentDiscountSpecial(baseSpecial);

test('ScannableItem can be constructed', () => {
    const scannableItem = new ScannableItem(item);
    expect(scannableItem.itemName).toBe('kiwi');
    expect(scannableItem.unitType).toBe('ounces');
    expect(scannableItem.price).toBe(1.42);
    expect(scannableItem.isMarkedDown).toBe(false);
    expect(scannableItem.priceReduction).toEqual(0);
    expect(scannableItem.special).toEqual(null);
    expect(scannableItem.isOnSpecial).toBe(false);
});

test('Scannable item can be on special', () => {
    const scannableItem = new ScannableItem(item);
    scannableItem.addSpecialToItem(special);
    expect(scannableItem.isOnSpecial).toBe(true);
    expect(scannableItem.special).toEqual(special);
});

test('Scannable item can be taken off special', () => {
    const scannableItem = new ScannableItem(item);
    scannableItem.addSpecialToItem(special);
    expect(scannableItem.isOnSpecial).toBe(true);
    expect(scannableItem.special).toEqual(special);
    scannableItem.removeSpecialFromItem();
    expect(scannableItem.isOnSpecial).toBe(false);
    expect(scannableItem.special).toEqual(null);
});

test('Scannable item can be marked down', () => {
    const scannableItem = new ScannableItem(item);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.isMarkedDown).toBe(true);
    expect(scannableItem.priceReduction).toEqual(0.10);
});

test('Scannable item can have the mark down removed', () => {
    const scannableItem = new ScannableItem(item);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.isMarkedDown).toBe(true);
    expect(scannableItem.priceReduction).toEqual(0.10);
    scannableItem.removeMarkDown();
    expect(scannableItem.isMarkedDown).toBe(false);
    expect(scannableItem.priceReduction).toEqual(0);
});

test('Marked down items have the correct price calculation', () => {
    const scannableItem = new ScannableItem(item);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.calculatePrice(1)).toEqual(1.32);
});

test('Non-marked down items have the correct price calculation', () => {
    const scannableItem = new ScannableItem(item);
    expect(scannableItem.calculatePrice(1)).toEqual(1.42); 
});

test('Marked down items that are also on special have the correct price calculation when the special is not triggered', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1
    };
    const scannableItem = new ScannableItem(item);
    scannableItem.addSpecialToItem(special);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.calculatePrice(1)).toEqual(.9);
});

test('Marked down items that are also on special have the correct price calculation when the special is triggered', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1
    };
    const scannableItem = new ScannableItem(item);
    scannableItem.addSpecialToItem(special);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.calculatePrice(6)).toEqual(5);
});

test('items that are on special have the correct price calculation when the special is triggered', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1
    };
    const scannableItem = new ScannableItem(item);
    scannableItem.addSpecialToItem(special);
    expect(scannableItem.calculatePrice(6)).toEqual(5);
});