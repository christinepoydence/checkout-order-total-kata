import ScannableItem from './scannableItem.js';

test('ScannableItem can be constructed', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1.42
    };
    const scannableItem = new ScannableItem(item);
    expect(scannableItem.itemName).toBe('kiwi');
    expect(scannableItem.unitType).toBe('ounces');
    expect(scannableItem.price).toBe(1.42);
    expect(scannableItem.isMarkedDown).toBe(false);
    expect(scannableItem.priceReduction).toEqual(0);
});

test('Scannable item can be marked down', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1.42
    };
    const scannableItem = new ScannableItem(item);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.isMarkedDown).toBe(true);
    expect(scannableItem.priceReduction).toEqual(0.10);
});

test('Scannable item that are marked down can have the mark down removed', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1.42
    };
    const scannableItem = new ScannableItem(item);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.isMarkedDown).toBe(true);
    expect(scannableItem.priceReduction).toEqual(0.10);
    scannableItem.removeMarkDown();
    expect(scannableItem.isMarkedDown).toBe(false);
    expect(scannableItem.priceReduction).toEqual(0);
});

test('Marked down items have the correct price calculation', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1.42
    };
    const scannableItem = new ScannableItem(item);
    scannableItem.markDownItem(0.10);
    expect(scannableItem.calculatePrice()).toEqual(1.32);
    
});

test('Non-marked down items have the correct price calculation', () => {
    const item = {
        itemName: 'kiwi',
        unitType: 'ounces',
        price: 1.42
    };
    const scannableItem = new ScannableItem(item);
    expect(scannableItem.calculatePrice()).toEqual(1.42);
    
});