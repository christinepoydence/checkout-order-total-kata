import ScannableItem from './scannableItem.js';

const item = {
    itemName: 'kiwi',
    unitType: 'ounces',
    price: 1.42
};

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
    scannableItem.addSpecialToItem('special');
    expect(scannableItem.isOnSpecial).toBe(true);
    expect(scannableItem.special).toEqual('special');
});

test('Scannable item can be taken off special', () => {
    const scannableItem = new ScannableItem(item);
    scannableItem.addSpecialToItem('special');
    expect(scannableItem.isOnSpecial).toBe(true);
    expect(scannableItem.special).toEqual('special');
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
    expect(scannableItem.calculatePrice()).toEqual(1.32);
});

test('Non-marked down items have the correct price calculation', () => {
    const scannableItem = new ScannableItem(item);
    expect(scannableItem.calculatePrice()).toEqual(1.42);
});